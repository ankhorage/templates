import { createNavigatorPlan } from '@ankhorage/navigator';
import { ZORA_COMPONENT_META } from '@ankhorage/zora/metadata';
import { expect, test } from 'bun:test';

import { resolveTemplate, validateTemplateManifest } from '../src/index';

test('Reader is a complete books-reading template with the released ebook reader requirement', () => {
  const manifest = resolveTemplate('books_reading', 'reader').createAppManifest();

  expect(manifest.metadata).toMatchObject({ category: 'books_reading', slug: 'reader' });
  expect(Object.keys(manifest.screens)).toEqual([
    'home',
    'library',
    'discover',
    'profile',
    'book-details',
    'reader',
    'settings',
  ]);
  expect(manifest.screens.reader?.root.children?.[0]).toMatchObject({
    type: 'Reader',
    props: { source: { mediaId: 'the-jungle-book-epub' }, format: 'epub' },
  });
  expect(manifest.screens.reader?.requires).toEqual({ capabilities: { ebookReader: true } });
  expect(manifest.navigator.routes[0]?.navigator?.routes.map((route) => route.name)).toEqual([
    'home',
    'library',
    'discover',
    'profile',
  ]);
  expect(validateTemplateManifest(manifest, 'release').status).toBe('ready');
});

test('Reader composes released explorer, rail, and filter contracts without placeholder props', () => {
  const manifest = resolveTemplate('books_reading', 'reader').createAppManifest();
  const libraryChildren = manifest.screens.library?.root.children ?? [];
  const explorer = libraryChildren.find(({ id }) => id === 'library-jungle-book');
  const filter = libraryChildren.find(({ id }) => id === 'library-filter');
  const homeRail = manifest.screens.home?.root.children?.find(
    ({ id }) => id === 'home-recommendations',
  );
  const itemSchema = ZORA_COMPONENT_META.MediaExplorer?.props.items?.itemSchema;

  if (itemSchema === undefined) throw new Error('MediaExplorer item schema is unavailable.');
  expect(itemSchema.map(({ key }) => key)).toContain('kind');
  expect(itemSchema.map(({ key }) => key)).toContain('name');
  expect(explorer).toMatchObject({
    type: 'MediaExplorer',
    props: { items: [{ id: 'the-jungle-book', kind: 'image', name: 'The Jungle Book' }] },
  });
  expect(filter?.type).toBe('ChipGroup');
  expect(filter?.props?.disabled).toBe(true);
  expect(Array.isArray(filter?.props?.items)).toBe(true);
  expect(homeRail).toMatchObject({
    type: 'ContentRail',
    props: { itemSize: 'regular' },
    children: [expect.objectContaining({ type: 'MediaCard' })],
  });
});

test('Reader composes tabs through TabList and TabPanel children', () => {
  const manifest = resolveTemplate('books_reading', 'reader').createAppManifest();
  const bookTabs = manifest.screens['book-details']?.root.children?.find(
    ({ id }) => id === 'book-tabs',
  );

  expect(bookTabs).toMatchObject({
    type: 'Tabs',
    children: [
      expect.objectContaining({ type: 'TabList' }),
      expect.objectContaining({ type: 'TabPanel', props: { value: 'overview' } }),
      expect.objectContaining({ type: 'TabPanel', props: { value: 'reviews' } }),
      expect.objectContaining({ type: 'TabPanel', props: { value: 'details' } }),
    ],
  });
  expect(manifest.dataBindings?.['discover-recommendations']).toBeUndefined();
});

test('Reader delegates navigation to released Navigator plans and does not claim an EPUB locator', () => {
  const manifest = resolveTemplate('books_reading', 'reader').createAppManifest();
  const reader = manifest.screens.reader?.root.children?.[0];

  expect(manifest.screens.reader?.requires?.capabilities).toEqual({ ebookReader: true });
  expect(reader).toMatchObject({ type: 'Reader', props: { format: 'epub' } });
  expect(reader?.props?.location).toBeUndefined();
  expect(reader?.props?.page).toBeUndefined();
  expect(reader?.props?.pageCount).toBeUndefined();
  expect(reader?.props?.progress).toBeUndefined();
  expect(
    createNavigatorPlan(manifest.navigator, {
      platform: 'web',
      responsiveSize: 'compact',
      expoRouterVersion: '57.0.18',
    }).diagnostics.filter(({ severity }) => severity === 'error'),
  ).toEqual([]);
});

test('Reader loads the public-domain Project Gutenberg EPUB source', async () => {
  const manifest = resolveTemplate('books_reading', 'reader').createAppManifest();
  const source = manifest.media?.assets['the-jungle-book-epub'];
  if (source?.source.kind !== 'url') throw new Error('Reader EPUB source must be a URL.');

  const response = await fetch(source.source.url);
  const bytes = new Uint8Array(await response.arrayBuffer());

  expect(response.ok).toBe(true);
  expect(response.headers.get('content-type')).toContain('application/epub+zip');
  expect(bytes.slice(0, 4)).toEqual(new Uint8Array([0x50, 0x4b, 0x03, 0x04]));
});
