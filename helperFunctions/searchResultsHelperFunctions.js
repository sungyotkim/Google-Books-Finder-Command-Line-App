import { handleResults } from "../handleSearchResults/handleResults.js";
import { handleViewReadingList } from "./readingListHelperFunctions.js";

export async function verifySearchResults(
  searchResults,
  idx,
  readingList,
  handleMainMenuOption,
  welcome
) {
  console.clear();
  if (!searchResults) {
    handleNoSearchResults(idx, handleMainMenuOption);
  } else if (searchResults === "error") {
    handleSearchResultsError(welcome);
  } else {
    const nextOption = await handleResults(searchResults, readingList);
    handleNextOption(nextOption, readingList, welcome);
  }
}

async function handleNextOption(nextOption, readingList, welcome) {
  if (nextOption === "View my reading list.") {
    console.clear();
    handleViewReadingList(readingList, welcome);
  } else {
    welcome();
  }
}

function handleNoSearchResults(idx, handleMainMenuOption) {
  console.log("No results found! Please try a different query.");
  handleMainMenuOption(idx, true);
}

function handleSearchResultsError(welcome) {
  console.log("We ran into an error, returning you to main menu.");
  console.log("Please check if your internet connection is online.");
  welcome(false);
}
