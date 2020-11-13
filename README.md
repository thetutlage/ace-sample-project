# Ace standalone CLI

> A sample project to demonstrate usage of AdonisJS ace to create a standalone CLI app

## Usage

Begin by cloning the repo

```sh

```

Next, install all the required dependencies. Just make sure you are running `node >= 12.0.0`

```sh
npm install
```

Next, compile the Typescript source to Javascript by running the following command.

```sh
npm run build
```

And now you can interact with the CLI locally by running `node build/bin/run.js` file

![](assets/help-screen.png)

- The compiled javascript output is written to the `build` folder.
- `bin/run.js` file is the entry point of the command line app
- Running this file without any arguments displays the help screen using a default command.

The commands I have added showcase some of the inbuilt features of ace. You can try running them

### `node build/bin/run.js greet`

![](assets/greet-command.png)

### `node build/bin/run.js prompts`

![](assets/prompts.gif)

### Development

Since the source code is in Typescript, it needs to be compiled down to Javascript before you can run it.

This can be painful during development and hence it created an npm script inside the `package.json` file to run the Typescript source code directly.

During development you can run the same set of commands by running `npm run dev <command-name>`

### Publishing via npm

You would want others to use your commandline by installing it globally and then running some binary. Let's call this binary `myapp` for now.

To begin with, we need to tell npm about our binary/commandline app name and the Javascript file we want to map to it.

This is done inside the `package.json` file.

```json
{
  "bin": {
    "myapp": "./build/bin/run.js"
  }
}
```

Lets give this a try right now. Run the following command.

```sh
npm run build && npm link
```

The `npm link` command will create a symlink of package inside the globally installed `node_modules` directory.

Now you can run the same set of commands using the binary name instead.

```sh
myapp greet
myapp prompts
myapp ui
```

## How its configured?

### About commands

- The commands are stored inside the `commands` directory.
- Every command is an ES6 class extending the ace `BaseCommand`.
- The `run` method on the command is executed to run the command.
- The command can define its arguments and flags using Typescript decorators.

### About entrypoint

The commandline needs to have an entrypoint. A common convention is to use `bin` directory for commandline entrypoints. So I decided to go with `bin/run.ts` file.

- The file imports the `Kernel` class from ace.
- The Kernel class alone is responsible for handling the complete lifecycle of running the commands.
- The `kernel.register` method accepts an array of commands to register. There are other ways too, but this is the simplest one to get started.

## Ace features

Following is the list of ace features

- Pre-bundled [ui library](https://github.com/poppinss/cliui) to display **tables**, **log messages**, **render tasks** and a lot more
- Pre-bundled [prompts libary](https://github.com/poppinss/prompts) to render different style of prompts.
- Lightweight API for creating files using stubs
- Support for command specific accepting arguments and flags
- Support for global flags. For example: `--help` flag to display help. Check `bin/run.ts` for example.
- Properly handles the lifecycle of commands and make sure the process exists with correct exit codes.
- In built helpers for display errors
- In built helpers for rendering commands help on the terminal
- Allows hooking into the lifecycle of commands using `find` and `run` hooks.

## Upcoming improvements

Currently ace relies on `@adonisjs/application` package that is very specific to AdonisJS. Removing this dependency needs changes on couple of places, but I never bothered doing it, since I know it is mostly used within AdonisJS apps.

## Opinionated UI

Ace is somewhat opinionated with its UI layer, as I really don't want to create something that is infinitely configurable. Items like the logger, tables, prompts and tasksUI doesn't allow many cutomizations.
