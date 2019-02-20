"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@bara/core");
// import {createStream, StreamEventPayload} from '@bara/core'
// import * as chokidar from 'chokidar'
//
console.log(core_1.default);
/**
 * Create filesystem stream at specific directory path.
 * @param {string} dir Which directory to observe the events.
 * @return {BaraStream}
 */
/* export const streamFs = (dir: string, onEvent?: (payload: any) => void) => */
// createStream({
// id: 'org.barajs.stream.fs',
// name: 'Stream File System',
// methods: {
// init: (emit, {dir}) => {
// const watcher = chokidar.watch(dir);
// watcher.on('add', (path: string) => emit('add', path));
// },
// onEvent: (payload: StreamEventPayload) => {
// console.log(payload);
// if (onEvent !== undefined) {
// onEvent(payload);
// }
// },
// },
// config: {dir},
/* }); */
exports.streamFs2 = (dir, onEvent) => {
    console.log('Meo', dir, onEvent);
};
exports.default = exports.streamFs2;
//# sourceMappingURL=stream-fs.js.map