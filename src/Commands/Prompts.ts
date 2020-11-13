import { BaseCommand, args, flags } from "@adonisjs/ace";

export default class Prompts extends BaseCommand {
  /**
   * Command name
   */
  public static commandName = "prompts";

  /**
   * Description is displayed on the help screen
   */
  public static description = "Showcasing prompts";

  /**
   * Execute command logic
   */
  public async run() {
    /**
     * A text input field
     */
    const username = await this.prompt.ask("Enter account username", {
      validate: (value) => !!(value && value.length),
    });

    /**
     * A text input field with hidden characters
     */
    const password = await this.prompt.secure("Enter account password", {
      validate: (value) => !!(value && value.length),
    });

    /**
     * A prompt to select one item from the list
     */
    const viewingExperience = await this.prompt.choice(
      "Select viewing experience",
      ["Basic", "HD", "HD Plus"],
      {
        hint: "Impacts subscription amount",
      }
    );

    /**
     * A prompt to select multiple items from the list. The options
     * can be an array of strings or an object with `name`, `message`
     * property
     */
    const interests = await this.prompt.multiple("Select Genres", [
      {
        name: "comedy",
        message: "Comedy",
      },
      {
        name: "thriller",
        message: "Thriller",
      },
      {
        name: "crime",
        message: "Crime",
      },
      {
        name: "comedy-drama",
        message: "Comedy Drama",
      },
      {
        name: "biography",
        message: "Biography",
      },
    ]);

    /**
     * A yes/no style prompt
     */
    const accountType = await this.prompt.toggle("Enable parental lock?", [
      "Yep",
      "Naahh",
    ]);

    console.log({
      username,
      password,
      viewingExperience,
      interests,
      accountType,
    });
  }
}
