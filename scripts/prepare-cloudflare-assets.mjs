import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));

await copyFile(
  join(outputDirectory, 'index.html'),
  join(outputDirectory, '_root.html'),
);
