import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { expect, test } from 'bun:test';
import { chromium, type Page } from 'playwright';

const acceptanceHost =
  '<!doctype html><html><body><main id="root"></main><script type="module" src="/app.js"></script></body></html>';

/*** Resolve React Native and React imports to one web React tree for the browser-only test bundle. */
const reactNativeWebPlugin = {
  name: 'react-native-web',
  setup(pluginBuild: Bun.PluginBuilder) {
    pluginBuild.onResolve({ filter: /^react-native$/ }, () => ({
      path: resolve(process.cwd(), 'node_modules/react-native-web/dist/index.js'),
    }));
    pluginBuild.onResolve({ filter: /^react(?:\/jsx(?:-dev)?-runtime)?$/ }, (args) => ({
      path:
        args.path === 'react'
          ? resolve(process.cwd(), 'node_modules/react/index.js')
          : resolve(process.cwd(), `node_modules/${args.path}.js`),
    }));
  },
};

/*** Build and serve the real released Runtime and ZORA public rendering boundary for Chromium. */
async function createGrossMeisterAcceptanceServer() {
  const outputDirectory = await mkdtemp(`${tmpdir()}/grossmeister-chromium-`);
  const { logs, outputs, success } = await Bun.build({
    entrypoints: ['test/grossmeisterChromiumHarness.tsx'],
    outdir: outputDirectory,
    plugins: [reactNativeWebPlugin],
    sourcemap: 'none',
    target: 'browser',
  });
  if (!success) throw new Error(logs.map(({ message }) => message).join('\n'));
  const [bundle] = outputs;
  if (bundle === undefined) throw new Error('GrossMeister Chromium bundle is missing.');
  const server = Bun.serve({
    fetch(request) {
      const { pathname } = new URL(request.url);
      if (pathname === '/')
        return new Response(acceptanceHost, { headers: { 'content-type': 'text/html' } });
      if (pathname === '/app.js') {
        return new Response(Bun.file(bundle.path), {
          headers: { 'content-type': 'text/javascript' },
        });
      }
      return new Response('Not found', { status: 404 });
    },
    port: 0,
  });
  const { port } = server;
  if (port === undefined) throw new Error('GrossMeister Chromium server did not bind a port.');
  return { outputDirectory, port, server };
}

/*** Remove the isolated browser bundle after each deterministic acceptance run. */
async function disposeGrossMeisterAcceptanceServer(
  server: ReturnType<typeof Bun.serve>,
  outputDirectory: string,
) {
  await server.stop(true);
  await rm(outputDirectory, { force: true, recursive: true });
}

test('GrossMeister Select controls update ChessBoard through real Chromium pointer input', async () => {
  const { outputDirectory, port, server } = await createGrossMeisterAcceptanceServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { height: 1200, width: 960 } });
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await openGrossMeister(page, port, errors);
    await selectDimension(page, 'columns', '10');
    await selectDimension(page, 'rows', '13');
    await assertBoard(page, '10', '13', 130);
    await selectDimension(page, 'columns', '24');
    await assertBoard(page, '24', '13', 312);
    await remountGrossMeister(page);
    await assertBoard(page, '24', '13', 312);
    await selectDimension(page, 'columns', '2');
    await selectDimension(page, 'rows', '2');
    await expectBoardCellCount(page, 4);
    await selectDimension(page, 'columns', '24');
    await selectDimension(page, 'rows', '24');
    await assertBoard(page, '24', '24', 576);
    await expectPreviewPieces(page);
    expect(errors).toEqual([]);
  } finally {
    await browser.close();
    await disposeGrossMeisterAcceptanceServer(server, outputDirectory);
  }
}, 30_000);

/*** Open the isolated web host and report browser failures if the released Select does not render. */
async function openGrossMeister(
  page: Page,
  port: number,
  errors: readonly string[],
): Promise<void> {
  await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'domcontentloaded' });
  await page
    .getByTestId('play-board-columns-trigger')
    .waitFor({ state: 'visible', timeout: 5_000 })
    .catch(async (error: Error) => {
      throw new Error(
        `GrossMeister did not render the column Select. Browser errors: ${errors.join('\n')}\n${await page.content()}\n${error.message}`,
      );
    });
}

/*** Select one released Popover option with native browser pointer input. */
async function selectDimension(page: Page, dimension: 'columns' | 'rows', value: string) {
  await page.getByTestId(`play-board-${dimension}-trigger`).click();
  const option = page.getByTestId(`play-board-${dimension}-option-${value}`);
  await option.waitFor({ state: 'visible' });
  await option.click();
}

/*** Assert both controlled labels and the rendered rectangular ChessBoard cell count. */
async function assertBoard(page: Page, columns: string, rows: string, cellCount: number) {
  await expectText(page, 'play-board-columns-trigger', columns);
  await expectText(page, 'play-board-rows-trigger', rows);
  await expectBoardCellCount(page, cellCount);
}

/*** Remount the screen while retaining the harness's one host-owned StateAdapter. */
async function remountGrossMeister(page: Page): Promise<void> {
  await page.evaluate(() => {
    (
      globalThis as typeof globalThis & {
        grossmeisterAcceptance: { remount: () => void };
      }
    ).grossmeisterAcceptance.remount();
  });
}

/*** Ensure the portable caller-owned preview pieces remain present after dimension changes. */
async function expectPreviewPieces(page: Page): Promise<void> {
  const board = page.getByTestId('play-board');
  for (const piece of ['♔', '♘', '♚', '♝']) {
    expect(await board.textContent()).toContain(piece);
  }
}

/*** Wait until one rendered Select trigger displays its controlled label. */
async function expectText(page: Page, testId: string, text: string): Promise<void> {
  await page.waitForFunction(
    '({ expected, selector }) => document.querySelector(selector)?.textContent === expected',
    { expected: text, selector: `[data-testid="${testId}"]` },
  );
}

/*** Wait until ChessBoard exposes every expected caller-owned grid cell. */
async function expectBoardCellCount(page: Page, count: number): Promise<void> {
  await page.waitForFunction(
    'expected => document.querySelectorAll(\'[data-testid="play-board"] [role="button"]\').length === expected',
    count,
  );
}
