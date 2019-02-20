"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const os_1 = require("os");
const stream_fs_1 = require("../src/stream-fs");
let tempdir = os_1.tmpdir();
describe('index', () => {
    beforeAll(() => {
        tempdir = path_1.join(tempdir, `org.barajs.stream.fs.${Math.random() * 100}`);
    });
    it('stream file system at provided path', () => {
        const mockEventHandler = jest.fn();
        console.log(tempdir);
        const stream = stream_fs_1.default(tempdir, mockEventHandler);
        console.log(stream);
        // stream.init();
    });
});
//# sourceMappingURL=stream-fs.test.js.map