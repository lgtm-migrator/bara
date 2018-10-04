import { expect, test } from "@oclif/test";

describe("", () => {
  test
    .stdout()
    .command([""])
    .it("runs ", ctx => {
      expect(ctx.stdout).to.contain(" world");
    });

  test
    .stdout()
    .command(["", "--name", "jeff"])
    .it("runs  --name jeff", ctx => {
      expect(ctx.stdout).to.contain(" jeff");
    });
});
