// Runnable check for moveKey: node src/lib/api.moveKey.test.mjs
import assert from 'node:assert/strict';
import { moveKey } from './api.js';

// root-level file into a new folder
assert.equal(moveKey('01.jpg', '', 'faces'), 'faces/01.jpg');
// nested file keeps its path relative to the current prefix
assert.equal(moveKey('labs/01-effects/x.mp4', 'labs/', 'keep'), 'labs/keep/01-effects/x.mp4');
// folder input with stray slashes is normalized
assert.equal(moveKey('01.jpg', '', '/faces/'), 'faces/01.jpg');
// deeper current prefix
assert.equal(moveKey('a/b/c/f.png', 'a/b/', 'moved'), 'a/b/moved/c/f.png');

console.log('moveKey ok');
