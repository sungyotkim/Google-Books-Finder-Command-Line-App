import inquirer from "inquirer";

export class ReadingList {
  constructor() {
    this.readingList = [];
  }

  isEmpty() {
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
