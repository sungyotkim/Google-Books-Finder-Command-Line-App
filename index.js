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
import { getBooks, getBooksByTitleAndAuthor } from "./fetch.js";
import { handleResults } from "./handleResults.js";
import { ReadingList } from "./readingList.js";

// initialize reading list
const readingList = new ReadingList();

// helper functions
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
const emptyListSpinner = createSpinner(
  chalk.red.bold("Your list is empty! Redirecting you to the main menu...")
);
const searchSpinner = createSpinner("Searching...");

async function welcome() {
  console.clear();
  console.log(
    chalk.blue.bold("Welcome to Google Books Finder Command Line App")
  );

  let res = await mainMenu();

  handleMainMenuOption(res);
}

async function handleMainMenuOption(idx, err = false) {
  // only clear if there are no error messages.
  if (!err) console.clear();

  let searchQuery;
  let searchResults;

  switch (idx) {
    // handle search by title
    case 0:
      console.log(chalk.blue.bold("Search By Book Title"));
      searchQuery = await searchByTitle();
      searchResults = await getBooks(searchQuery, "intitle");
      break;

    // handle search by author
    case 1:
      console.log(chalk.blue.bold("Search By Book Author"));
      searchQuery = await searchByAuthor();
      searchResults = await getBooks(searchQuery, "inauthor");
      break;

    // handle search by subject
    case 2:
      console.log(chalk.blue.bold("Search By Book Subject"));
      searchQuery = await searchBySubject();
      searchResults = await getBooks(searchQuery, "subject");
      break;

    // handle search by title and author
    case 3:
      console.log(chalk.blue.bold("Search By Book Title And Author"));
      searchQuery = await searchByTitleAndAuthor();
      searchResults = await getBooksByTitleAndAuthor(searchQuery);
      break;

    // handle view reading list
    case 4:
      // check if reading list is empty
      if (readingList.isEmpty()) {
        emptyListSpinner.start();
        await sleep();
        emptyListSpinner.stop();
        welcome();
      } else {
        await readingList.show();
        welcome();
      }
      return;
    default:
      return;
  }

  searchSpinner.start();
  await sleep();
  searchSpinner.stop();

  // handle no results
  if (!searchResults) {
    console.clear();
    console.log("No results found! Please try a different query.");
    return handleMainMenuOption(idx, true);
  }

  const booksAdded = await handleResults(searchResults);

  // add books
  const nextOption = await readingList.addBooks(booksAdded);

  if (nextOption === "View my reading list.") {
    // check if reading list is empty
    if (readingList.isEmpty()) {
      emptyListSpinner.start();
      await sleep();
      emptyListSpinner.stop();
      welcome();
    } else {
      await readingList.show();
      welcome();
    }
  } else {
    welcome();
  }
}

// run with top level await
await welcome();
