#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { mainMenu } from "./mainMenu.js";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  console.log(
    chalk.blue.bold("Welcome to Google Books Finder Command Line App")
  );

  await sleep();

  console.log("Please select an option below");
  mainMenu();
}

// run with top level await
console.clear();
await welcome();
