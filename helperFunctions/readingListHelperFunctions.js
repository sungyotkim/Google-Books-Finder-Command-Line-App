import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { returnToMenuPrompt } from "../prompts/returnToMenuPrompt.js";
import { showReadingList } from "../readingList/showReadingList.js";

export function handleViewReadingList(readingList, welcome) {
  if (readingList.isEmpty()) {
    handleEmptyList(welcome);
  } else {
    handleShowList(readingList, welcome);
  }
}

export async function handleEmptyList(welcome) {
  // pause temporarily to allow user to read the error message for empty reading list before redirecting
  const pause = (ms = 700) => new Promise((r) => setTimeout(r, ms));
  const emptyListSpinner = createSpinner(
    chalk.red.bold("Your list is empty! Redirecting you to the main menu...")
  );

  emptyListSpinner.start();
  await pause();
  emptyListSpinner.stop();

  welcome();
}

export async function handleShowList(readingList, welcome) {
  showReadingList(readingList);
  await returnToMenuPrompt();

  welcome();
}
