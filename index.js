#!/usr/bin/env node

import chalk from "chalk";
import { mainMenuPrompt } from "./prompts/mainMenuPrompt.js";
import {
  searchByTitle,
  searchByAuthor,
  searchBySubject,
  searchByTitleAndAuthor,
} from "./bookSearch.js";
import { getBooks, getBooksByTitleAndAuthor } from "./fetch.js";
import { ReadingList } from "./readingList/readingList.js";
import { handleViewReadingList } from "./helperFunctions/readingListHelperFunctions.js";
import { verifySearchResults } from "./helperFunctions/searchResultsHelperFunctions.js";

const readingList = new ReadingList();

async function welcome(clear = true) {
  if (clear) console.clear();
  console.log(
    chalk.blue.bold("Welcome to Google Books Finder Command Line App")
  );

  let res = await mainMenuPrompt();

  handleMainMenuOption(res);
}

async function handleMainMenuOption(idx, err = false) {
  if (!err) console.clear();

  let searchQuery;
  let searchResults;

  switch (idx) {
    case 0:
      console.log(chalk.blue.bold("Search By Book Title"));
      searchQuery = await searchByTitle();
      searchResults = await getBooks(searchQuery, "intitle");
      break;

    case 1:
      console.log(chalk.blue.bold("Search By Book Author"));
      searchQuery = await searchByAuthor();
      searchResults = await getBooks(searchQuery, "inauthor");
      break;

    case 2:
      console.log(chalk.blue.bold("Search By Book Subject"));
      searchQuery = await searchBySubject();
      searchResults = await getBooks(searchQuery, "subject");
      break;

    case 3:
      console.log(chalk.blue.bold("Search By Book Title And Author"));
      searchQuery = await searchByTitleAndAuthor();
      searchResults = await getBooksByTitleAndAuthor(searchQuery);
      break;

    case 4:
      handleViewReadingList(readingList, welcome);
      return;

    default:
      console.log("Unexpected error, exiting the application.");
      return;
  }

  verifySearchResults(
    searchResults,
    idx,
    readingList,
    handleMainMenuOption,
    welcome
  );
}

await welcome();
