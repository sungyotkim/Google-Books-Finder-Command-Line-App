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

  let res = await mainMenu();

  handleMainMenuOption(res);
}

function handleMainMenuOption(idx) {
  console.log(idx);
  switch (idx) {
    case 0:
      // handle search by title
      break;
    case 1:
      // handle search by author
      break;
    case 2:
      // handle search by subject
      break;
    case 3:
      // handle search by title and author
      break;
    case 4:
      // handle view reading list
      break;
    default:
      return;
  }
}

// run with top level await
console.clear();
await welcome();
