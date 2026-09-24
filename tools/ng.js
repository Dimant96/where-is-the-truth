// Runs the Angular CLI on any Node version: Angular 10 builds with webpack 4, whose hashing
// fails (and hangs) on Node 17+ unless OpenSSL's legacy provider is enabled.
const { spawnSync } = require('child_process');
const path = require('path');

const nodeMajor = Number(process.versions.node.split('.')[0]);
const nodeFlags = nodeMajor >= 17 ? ['--openssl-legacy-provider'] : [];
const ngBin = path.join(__dirname, '..', 'node_modules', '@angular', 'cli', 'bin', 'ng');

const result = spawnSync(process.execPath, [...nodeFlags, ngBin, ...process.argv.slice(2)], { stdio: 'inherit' });
process.exit(result.status === null ? 1 : result.status);
