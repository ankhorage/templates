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
    props: { source: { mediaId: 'my-tigers-sample' }, format: 'epub' },
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

test('Reader delegates runtime dependency planning to the public ebookReader capability', () => {
  const manifest = resolveTemplate('books_reading', 'reader').createAppManifest();

  expect(manifest.screens.reader?.requires?.capabilities).toEqual({ ebookReader: true });
});
