import { Command, flags } from "@oclif/command";

export default class Backend extends Command {
  static description = "Create a backend service";

  static examples = [
    `$ bara backend
create backend service
`
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];

  async run() {
    const { args, flags } = this.parse(Backend);

    const name = flags.name || "world";
    this.log(`Bara! Created backend ${name} from ./src/commands/backend.ts`);
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}
