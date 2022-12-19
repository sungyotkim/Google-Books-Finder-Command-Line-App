#!/usr/bin/env node

import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { mainMenu } from "./mainMenu.js";
import {
  searchByTitle,
  searchByAuthor,
  searchBySubject,
  searchByTitleAndAuthor,
} from "./bookSearch.js";

const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  console.log(
    chalk.blue.bold("Welcome to Google Books Finder Command Line App")
  );

  await sleep();

  let res = await mainMenu();

  handleMainMenuOption(res);
}

async function handleMainMenuOption(idx) {
  console.clear();
  let res;

  switch (idx) {
    // handle search by title
    case 0:
      console.log(chalk.blue.bold("Search By Book Title"));
      res = await searchByTitle();
      handleSearchResult(res);
      break;
    // handle search by author
    case 1:
      console.log(chalk.blue.bold("Search By Book Author"));
      res = await searchByAuthor();
      handleSearchResult(res);
      break;
    // handle search by subject
    case 2:
      console.log(chalk.blue.bold("Search By Book Subject"));
      res = await searchBySubject();
      handleSearchResult(res);
      break;
    // handle search by title and author
    case 3:
      console.log(chalk.blue.bold("Search By Book Title And Author"));
      res = await searchByTitleAndAuthor();
      handleSearchResult(res);
      break;
    // handle view reading list
    case 4:
      break;
    default:
      return;
  }
}

function handleSearchResult(query) {
  console.log(Array.isArray(query));
  console.log(query);
}

// run with top level await
console.clear();
await welcome();
