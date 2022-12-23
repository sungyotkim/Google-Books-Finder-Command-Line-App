#!/usr/bin/env node

import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { mainMenuPrompt } from "./prompts/mainMenuPrompt.js";
import {
  searchByTitle,
  searchByAuthor,
  searchBySubject,
  searchByTitleAndAuthor,
} from "./bookSearch.js";
import { getBooks, getBooksByTitleAndAuthor } from "./fetch.js";
import { ReadingList } from "./readingList/readingList.js";
import { showReadingList } from "./readingList/showReadingList.js";
import { returnToMenuPrompt } from "./prompts/returnToMenuPrompt.js";
import { handleResults } from "./handleSearchResults/handleResults.js";

const readingList = new ReadingList();

// sleep temporarily to allow user to read the error message for empty reading list before redirecting
const sleep = (ms = 700) => new Promise((r) => setTimeout(r, ms));
const emptyListSpinner = createSpinner(
  chalk.red.bold("Your list is empty! Redirecting you to the main menu...")
);
const searchSpinner = createSpinner("Searching...");

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
      searchResults = await getBooks(searchQuery, "intitle", searchSpinner);
      break;

    case 1:
      console.log(chalk.blue.bold("Search By Book Author"));
      searchQuery = await searchByAuthor();
      searchResults = await getBooks(searchQuery, "inauthor", searchSpinner);
      break;

    case 2:
      console.log(chalk.blue.bold("Search By Book Subject"));
      searchQuery = await searchBySubject();
      searchResults = await getBooks(searchQuery, "subject", searchSpinner);
      break;

    case 3:
      console.log(chalk.blue.bold("Search By Book Title And Author"));
      searchQuery = await searchByTitleAndAuthor();
      searchResults = await getBooksByTitleAndAuthor(
        searchQuery,
        searchSpinner
      );
      break;

    case 4:
      if (readingList.isEmpty()) {
        handleEmptyList();
      } else {
        showReadingList(readingList);
        await returnToMenuPrompt();
        welcome();
      }
    default:
      return;
  }

  searchSpinner.stop();

  verifySearchResults(searchResults, idx);
}

async function verifySearchResults(searchResults, idx) {
  if (!searchResults) {
    console.clear();
    console.log("No results found! Please try a different query.");
    return handleMainMenuOption(idx, true);
  } else if (searchResults === "error") {
    console.clear();
    console.log("We ran into an error, returning you to main menu.");
    console.log("Please check if your internet connection is online.");
    return welcome(false);
  } else {
    const nextOption = await handleResults(searchResults, readingList);
    handleNextOption(nextOption);
  }
}

async function handleNextOption(nextOption) {
  if (nextOption === "View my reading list.") {
    console.clear();
    if (readingList.isEmpty()) {
      handleEmptyList();
    } else {
      showReadingList(readingList);
      await returnToMenuPrompt();
      welcome();
    }
  } else {
    welcome();
  }
}

async function handleEmptyList() {
  emptyListSpinner.start();
  await sleep();
  emptyListSpinner.stop();
  welcome();
}

await welcome();
