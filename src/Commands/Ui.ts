import { BaseCommand, flags } from "@adonisjs/ace";

export default class Ui extends BaseCommand {
  /**
   * Command name
   */
  public static commandName = "ui";

  /**
   * Description is displayed on the help screen
   */
  public static description = "See a showcase of cli ui";

  /**
   * Check "runTasks" method to use how this flag is used to
   * switch the instructions output
   */
  @flags.boolean({ description: "Run tasks in verbose mode" })
  public verbose: boolean;

  /**
   * A box with a heading and some line of text you want someone
   * to follow
   */
  private renderInstructions() {
    this.ui
      .instructions()
      .heading("Run following commands to get started")
      .add(this.colors.cyan("cd hello-world"))
      .add(this.colors.cyan("node ace serve --watch"))
      .render();
  }

  /**
   * A standard CLI table
   */
  private renderTable() {
    this.ui
      .table()
      .head(["Route", "Controller", "Middleware"])
      .row(["GET /", "HomeController.index", ""])
      .row(["GET users/:id", "UsersController.show", "auth"])
      .row(["POST users", "UsersController.store", "auth, acl:admin"])
      .render();
  }

  /**
   * Show instructions
   */
  private async runTasks() {
    const tasksUi = this.verbose ? this.ui.tasks.verbose() : this.ui.tasks();

    /**
     * Ignore the implementation here. It is a dummy function to mimic
     * a time taking task
     */
    function aTimeTakingTask(logger) {
      return new Promise((resolve) => {
        let counter = 0;
        const interval = setInterval(() => {
          if (counter === 100) {
            clearInterval(interval);
            resolve();
          } else {
            logger.logUpdate(`completed ${counter}%`);
          }
          counter++;
        }, 20);
      });
    }

    /**
     * The UI doesn't support running tasks concurrently. One task
     * has to finish before starting the another one
     */
    await tasksUi
      .add("scaffolding project", async (logger, task) => {
        await aTimeTakingTask(logger);
        await task.complete("done");
      })
      .add("install dependencies", async (logger, task) => {
        await aTimeTakingTask(logger);
        await task.complete("done");
      })
      .add("finalize setup", async (logger, task) => {
        await aTimeTakingTask(logger);
        await task.complete("done");
      })
      .run();
  }

  /**
   * Execute command logic
   */
  public async run() {
    this.renderInstructions();
    this.renderTable();
    await this.runTasks();
  }
}
