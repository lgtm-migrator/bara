import {Command, flags} from '@oclif/command';
import cli from 'cli-ux';

export default class Create extends Command {
  static description = 'Create new Bara application';

  static examples = [`$ bara create
       Create new Bara application
`];

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with no value (-t, --template)
    template: flags.string({
      char: 't',
      options: ['backend', 'frontend', 'devops'],
      description: 'Choose a template'
    })
  };

  static args = [{name: 'appName'}];

  async run() {
    const {args, flags} = this.parse(Create);

    if (args.appName && flags.template) {
      this.log(`Creating from template ${flags.template}: ${args.appName}...`);
      cli.action.start('Cloning template repo...');
      await cli.wait(1500);
      cli.action.stop();
    }
  }
}
