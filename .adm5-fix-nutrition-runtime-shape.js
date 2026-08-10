import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const write = (path, value) => fs.writeFileSync(path, value);
const count = (source, fragment) => source.split(fragment).length - 1;
const requireCount = (source, fragment, expected, label) => {
  const actual = count(source, fragment);
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected}, found ${actual}`);
  }
};
const replaceOnce = (source, before, after, label) => {
  requireCount(source, before, 1, label);
  return source.replace(before, after);
};

const root = 'src/templates/starter/categories/food-drink/nutrition-catalog-scan';

const generatedApiPath = `${root}/generatedApi.ts`;
let generatedApi = read(generatedApiPath);
generatedApi = replaceOnce(
  generatedApi,
  "{ name: 'createdAt', type: 'datetime', required: true }",
  "{ name: 'createdAt', type: 'datetime' }",
  'createdAt field',
);
generatedApi = replaceOnce(
  generatedApi,
  "{ name: 'updatedAt', type: 'datetime', required: true }",
  "{ name: 'updatedAt', type: 'datetime' }",
  'updatedAt field',
);
write(generatedApiPath, generatedApi);

const bindingsPath = `${root}/bindings.ts`;
let bindings = read(bindingsPath);
const barcodeBlock = `            barcode: {
              kind: 'source',
              source: {
                kind: 'state',
                path: 'forms.products.create.barcode',
              },
              transforms: ['trim'],
            },`;
requireCount(bindings, barcodeBlock, 1, 'create barcode binding');
bindings = bindings.replace(
  barcodeBlock,
  `${barcodeBlock}
            normalizedBarcode: {
              kind: 'source',
              source: {
                kind: 'state',
                path: 'forms.products.create.barcode',
              },
              transforms: ['trim'],
            },`,
);

const createResultPattern = /(operation: productCreateOperation,\n\s+)path: 'product\.id'/g;
const createResultMatches = [...bindings.matchAll(createResultPattern)];
if (createResultMatches.length !== 2) {
  throw new Error(`generated create result paths: expected 2, found ${createResultMatches.length}`);
}
bindings = bindings.replace(createResultPattern, "$1path: 'id'");

const generatedDetailPattern = /path: 'product\.(?!id)([^']+)'/g;
const generatedDetailMatches = [...bindings.matchAll(generatedDetailPattern)];
if (generatedDetailMatches.length < 1) {
  throw new Error('Expected generated detail wrapper paths.');
}
bindings = bindings.replace(generatedDetailPattern, "path: '$1'");
write(bindingsPath, bindings);

const screensPath = `${root}/screens.ts`;
let screens = read(screensPath);
const wrappedList = `                operationId: 'products.list',
              },
              path: 'products',`;
screens = replaceOnce(
  screens,
  wrappedList,
  `                operationId: 'products.list',
              },`,
  'generated list wrapper path',
);
screens = replaceOnce(
  screens,
  "path: 'product.imageRefs'",
  "path: 'imageRefs'",
  'generated detail image path',
);
screens = replaceOnce(
  screens,
  'Loaded from the nutrition API using the current route param product ID.',
  'Loaded through the generated product read operation using the current route param ID.',
  'detail source copy',
);
screens = replaceOnce(
  screens,
  'Each block reflects one image ref from product.imageRefs.',
  'Each block reflects one image ref from the current product imageRefs field.',
  'image refs copy',
);
screens = replaceOnce(
  screens,
  'Prefilled from scan or manual entry; normalized before API calls.',
  'Prefilled from scan or manual entry; normalized before the generated create operation.',
  'barcode form copy',
);
screens = replaceOnce(
  screens,
  'If POST /products returns 409 with product.id, the generated binding opens the existing product instead of treating the conflict as fatal.',
  'Barcode uniqueness is enforced by the generated database operation; duplicate inserts surface as database-operation diagnostics.',
  'duplicate handling copy',
);
screens = replaceOnce(
  screens,
  'The generated app should show inline validation for 400 responses and retry messaging when the backend is unavailable with 503.',
  'The generated app should surface invalid input and database-operation diagnostics without assuming HTTP status codes.',
  'generated error copy',
);
write(screensPath, screens);

const testPath = 'test/create-food-drink-nutrition-catalog-scan-template.test.ts';
let testSource = read(testPath);

const listExpectationPattern =
  /(operationId: 'products\.list',\n\s+},)\n\s+path: 'products',/g;
const listExpectationMatches = [...testSource.matchAll(listExpectationPattern)];
if (listExpectationMatches.length !== 2) {
  throw new Error(
    `generated list expectations: expected 2, found ${listExpectationMatches.length}`,
  );
}
testSource = testSource.replace(listExpectationPattern, '$1');

testSource = replaceOnce(
  testSource,
  "path: 'product.imageRefs'",
  "path: 'imageRefs'",
  'detail image expectation',
);
testSource = replaceOnce(
  testSource,
  "path: 'product.name'",
  "path: 'name'",
  'detail name expectation',
);
testSource = replaceOnce(
  testSource,
  "path: 'product.nutritionFacts.basis'",
  "path: 'nutritionFacts.basis'",
  'detail nutrition expectation',
);

const createExpectationPattern =
  /(operationId: 'products\.create',\n\s+},)\n\s+path: 'product\.id',/g;
const createExpectationMatches = [...testSource.matchAll(createExpectationPattern)];
if (createExpectationMatches.length !== 2) {
  throw new Error(
    `generated create expectations: expected 2, found ${createExpectationMatches.length}`,
  );
}
testSource = testSource.replace(createExpectationPattern, "$1\n      path: 'id',");

const packageExpectation =
  "    expect(createButtonBindings?.events?.press?.[0]?.input?.packageLabel).toEqual({";
requireCount(testSource, packageExpectation, 1, 'packageLabel expectation');
testSource = testSource.replace(
  packageExpectation,
  `    expect(createButtonBindings?.events?.press?.[0]?.input?.normalizedBarcode).toEqual({
      kind: 'source',
      source: {
        kind: 'state',
        path: 'forms.products.create.barcode',
      },
      transforms: ['trim'],
    });
${packageExpectation}`,
);
write(testPath, testSource);

const domainTestPath = 'test/nutrition-domain-data.test.ts';
let domainTest = read(domainTestPath);
const operationAssertion =
  "              expect(resource?.operations).toEqual(['list', 'read', 'create', 'update', 'delete']);";
requireCount(domainTest, operationAssertion, 1, 'resource operations assertion');
domainTest = domainTest.replace(
  operationAssertion,
  `${operationAssertion}
              expect(
                resource?.collection.fields.find((field) => field.name === 'createdAt')?.required,
              ).not.toBe(true);
              expect(
                resource?.collection.fields.find((field) => field.name === 'updatedAt')?.required,
              ).not.toBe(true);`,
);
write(domainTestPath, domainTest);

const docsPath = 'docs/nutrition-catalog-scan-data.md';
let docs = read(docsPath);
const directShapeText =
  'Generated database operations return list arrays and resource records directly.';
if (!docs.includes(directShapeText)) {
  docs += `\n\n${directShapeText} Template bindings therefore use the direct result shape instead of legacy HTTP wrapper paths such as \`products\` or \`product.*\`.\n`;
}
write(docsPath, docs);
