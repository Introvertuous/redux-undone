import { resolve } from 'path';
import { cp, mkdir, rm } from 'shelljs';

import pkg from '../package.json';

const root = resolve(__dirname, '..');
const projectDir = process.argv[2];

if (!projectDir) {
  console.log(
    'A target project directory is required. `yarn build-consumer PROJECT_DIRECTORY`'
  );
  process.exit(1);
}

const customerDir = resolve(root, '..', projectDir, 'node_modules', pkg.name);
const files = ['package.json', 'README.md', 'LICENSE', ...pkg.files];

console.log('Cleaning up old build...');
rm('-rf', customerDir);

console.log('Creating new build directory...');
mkdir(customerDir);

console.log('Copying build to node_modules...');
cp('-R', files, customerDir);

console.log('Build copied to consuming project.');
