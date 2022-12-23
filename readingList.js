import inquirer from "inquirer";
import chalk from "chalk";

export class ReadingList {
  constructor() {
    this.readingList = [];
  }

  async show() {
    console.clear();
    console.log(chalk.blue.bold("Your reading list:"));

    this.readingList.forEach((item, i) => {
      console.log(`${i + 1}.${item}`);
    });

    const res = await inquirer.prompt({
      name: "return",
      type: "input",
      message: "Press Enter to return to main menu",
    });

    return res.return;
  }

  async isEmpty() {
    return this.readingList.length === 0;
  }

  async addBooks(booksAdded) {
    console.clear();

    const [books, titles] = booksAdded;

    books.forEach((book) => {
      this.readingList.push(book);
    });

    if (books.length === 0) {
      console.log("No books were added to your list.");
    } else if (books.length === 1) {
      console.log(`${titles} was added to your list.`);
    } else {
      console.log(`${titles} were added to your list.`);
    }

    const nextOptions = ["View my reading list.", "Return to main menu."];

    const option = await inquirer.prompt({
      name: "next",
      type: "list",
      message: "What would you like to do next?",
      choices: nextOptions,
    });

    return option.next;
  }
}
