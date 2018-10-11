import {expect, test} from '@oclif/test';

describe('backend', () => {
  test
    .stdout()
    .command(['backend'])
    .it('backend ', ctx => {
      expect(ctx.stdout).to.contain(' world');
    });

  test
    .stdout()
    .command(['backend', '--name', 'watch-file'])
    .it('runs  --name watch-file', ctx => {
      expect(ctx.stdout).to.contain(' watch-file');
    });
});
