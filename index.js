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

async function welcome() {
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
      break;
    default:
      return;
  }

  // handle no results
  if (!searchResults) {
    console.clear();
    console.log("No results found! Please try a different query.");
    return handleMainMenuOption(idx, true);
  }

  const booksAdded = await handleResults(searchResults);
  console.log(booksAdded);

  // TODO return handleBooksAdded(booksAdded);
}

// run with top level await
console.clear();
await welcome();
