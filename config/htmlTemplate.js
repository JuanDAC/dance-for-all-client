import {join} from 'path';
import {readFileSync, copyFileSync, existsSync, mkdirSync} from 'fs';
import {STATICS_DIR, DEPENDENCY_DIR, BUILD_DIR} from './globals';

const dependenciesFiles = [
  '/@webcomponents/webcomponentsjs/webcomponents-loader.js',
  '/lit/polyfill-support.js',
];

export const htmlTemplate = (js = []) => {
  const htmlDir = join(STATICS_DIR, 'index.html');
  const htmlRaw = readFileSync(htmlDir, {encoding: 'utf-8'}) ?? '';

  if (!existsSync(BUILD_DIR)) {
    mkdirSync(BUILD_DIR, {
      recursive: true,
    });
  }

  const aplication = js.sort(
    ({fileName}) => -0.5 + Number(fileName.includes('index.js'))
  );

  const dependencies = dependenciesFiles.map((direction) => ({
    fileName: direction.split('/').pop(),
  }));

  dependenciesFiles
    .map((direction) => join(DEPENDENCY_DIR, direction))
    .forEach((direction) => {
      copyFileSync(direction, join(BUILD_DIR, direction.split('/').pop()));
    });

  const scripts = [...dependencies, ...aplication].reduce(
    (acum, {fileName}) => `${acum}  <script src="${fileName}"></script>\n`,
    ''
  );

  const html = htmlRaw.replace('</head>', `${scripts}\n</head>`);

  return html;
};
