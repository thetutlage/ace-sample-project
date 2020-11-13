import { BaseCommand, args, flags } from "@adonisjs/ace";

function getPossibleConnections() {
  return ["sqlite", "mysql", "pg"];
}

export default class FlagDefaults extends BaseCommand {
  /**
   * Command name
   */
  public static commandName = "flag:defaults";

  /**
   * Description is displayed on the help screen
   */
  public static description =
    "Showcasing where a missing flag can trigger a prompt";

  /**
   * Registering a flag `--connection`. Flags can have default value
   * function that can optionally return a value to be used when
   * the flag is not defined.
   *
   * In this example: We want to prompt the user to select one of the
   * multiple database connections when the flag is not defined.
   */
  @flags.string({
    defaultValue: (command) => {
      if (getPossibleConnections().length > 1) {
        return command.prompt.choice(
          "Select the database connection",
          getPossibleConnections()
        );
      }
    },
  })
  public connection: string | undefined;

  /**
   * Execute command logic
   */
  public async run() {
    this.logger.info(`The connection is ${this.connection}`);
  }
}
