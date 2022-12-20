import inquirer from "inquirer";
import chalk from "chalk";

export class ReadingList {
  constructor() {
    this.readingList = [];
  }

  async show() {
    console.clear();
    console.log(chalk.blue.bold("Your reading list:"));

    // display each item in the reading list
    this.readingList.forEach((item, i) => {
      console.log(`${i + 1}.${item}`);
    });

    const res = await inquirer.prompt({
      name: "return",
      type: "input",
      message: "Press Enter to return to main menu",
    });

    // return only if user presses Enter
    return res.return;
  }

  isEmpty() {
    // true if list is empty, false if not
    return this.readingList.length === 0;
  }

  async addBooks(booksAdded) {
    console.clear();

    // deconstruct the array
    const [books, titles] = booksAdded;

    // add each book to the reading list
    books.forEach((book) => {
      this.readingList.push(book);
    });

    if (books.length === 0) {
      // if the user opted to add no books
      console.log("No books were added to your list.");
    } else if (books.length === 1) {
      // user added one book, singular
      console.log(`${titles} was added to your list.`);
    } else {
      // user added multiple books, plural
      console.log(`${titles} were added to your list.`);
    }

    // prompt user for next actions
    const options = ["View my reading list.", "Return to main menu."];

    const option = await inquirer.prompt({
      name: "next",
      type: "list",
      message: "What would you like to do next?",
      choices: options,
    });

    return option.next;
  }
}
