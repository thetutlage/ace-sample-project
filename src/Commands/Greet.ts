import { BaseCommand, args, flags } from "@adonisjs/ace";

export default class Greet extends BaseCommand {
  /**
   * Command Name
   */
  public static commandName = "greet";

  /**
   * Description is displayed on the help screen
   */
  public static description = "Great a user with their name";

  /**
   * Argument accepted by the command. The arguments are accepted in the
   * same order as they are defined inside the class from top to
   * bottom.
   */
  @args.string({ description: "Name of the user to greet" })
  public name: string;

  /**
   * Define a flag. Flags can have aliases too. In this case, the
   * flag is `--uppercase` or `-u`.
   */
  @flags.boolean({ description: "Change to uppercase", alias: "u" })
  public upperCase: string;

  /**
   * Execute command logic
   */
  public async run() {
    if (this.upperCase) {
      this.name = this.name.toUpperCase();
    }

    this.logger.info(`Hello ${this.name}`);
  }
}
