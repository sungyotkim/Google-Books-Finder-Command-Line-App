import { addAnyToReadingListPrompt } from "../prompts/addAnyToReadingListPrompt.js";
import { viewListOrReturnToMenuPrompt } from "../prompts/viewListOrReturnToMenuPrompt.js";
import { addBooksToReadingList } from "../readingList/addBooksToReadingList.js";
import { addToDisplay } from "./addToDisplay.js";
import { convertToTitles } from "./convertToTitles.js";
import { logAddBooksMessage } from "./logAddBooksMessage.js";

export async function handleResults(results, readingList) {
  console.clear();
  const display = addToDisplay(results);
  const books = await addAnyToReadingListPrompt(display);
  const titles = convertToTitles(books);

  addBooksToReadingList(books, readingList);
  logAddBooksMessage(titles, books.length);

  const nextOption = await viewListOrReturnToMenuPrompt();
  return nextOption;
}
