import inquirer from "inquirer";
import chalk from "chalk";

export class ReadingList {
  constructor() {
    this.readingList = [];
  }

  show() {
    console.clear();
    console.log(chalk.blue.bold("Your reading list:"));

    this.readingList.forEach((item, i) => {
      console.log(`${i + 1}.${item}`);
    });
  }

  async addBooks(booksAdded) {
    const [books, titles] = booksAdded;

    books.forEach((book) => {
      this.readingList.push(book);
    });

    console.log(`${titles} were added to your list.`);

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
