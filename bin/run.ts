#!/usr/bin/env node

import { join } from "path";
import { Kernel, handleError } from "@adonisjs/ace";
import { Application } from "@adonisjs/application";

/**
 * Import all commands
 */
import Ui from "../src/Commands/Ui";
import Greet from "../src/Commands/Greet";
import Prompts from "../src/Commands/Prompts";
import Lifecycle from "../src/Commands/Lifecycle";
import FlagDefaults from "../src/Commands/FlagDefaults";

/**
 * Kernel is responsible for parsing command line args, flags. Finding
 * a command and running it.
 */
const kernel = new Kernel(
  new Application(join(__dirname, ".."), "console", {})
);

kernel.flag(
  "help",
  (value, _, command) => {
    if (!value) {
      return;
    }

    kernel.printHelp(command);
    process.exit(0);
  },
  {}
);

/**
 * Register commands with Kernel.
 */
kernel.register([Greet, Ui, Lifecycle, Prompts, FlagDefaults]);

/**
 * Handle command line input
 */
kernel.handle(process.argv.splice(2)).catch((error) => {
  handleError(error);
});
