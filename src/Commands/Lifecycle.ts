import { BaseCommand, args, flags } from "@adonisjs/ace";

export default class Lifecycle extends BaseCommand {
  /**
   * Command name
   */
  public static commandName = "lifecycle";

  /**
   * Description is displayed on the help screen
   */
  public static description = "Demonstrates command lifecycle methods";

  /**
   * Executed before the run method
   */
  public async prepare() {
    this.logger.info("Prepare executed");
  }

  /**
   * Execute command logic
   */
  public async run() {
    this.logger.info("Run executed");
    throw new Error("Foo");
  }

  /**
   * Executed after the run method
   */
  public async completed() {
    this.logger.info(`Executed even after error "${this.error!.message}"`);
  }
}
