# Google-Books-Finder-Command-Line-App
This is a simple command line application that allows you to use the Google Books API to search for books and construct a reading list. This application was created using Node.js to utilize colorful text and interactive packages for a better user experience.

## Try the app
```
npx google-books-finder-command-line-app
```

## Technologies/APIs Used
- JavaScript
- Google Books API

## Packages Used
[chalk](https://github.com/chalk/chalk) | 
[inquirer](https://github.com/SBoudrias/Inquirer.js) |
[nanospinner](https://github.com/usmanyunusov/nanospinner)

## Features
- Users may search for a book via title, author, subject, or title and author and will obtain a list of 5 books matching their query.
- Each search result item will include the book's title, author and publishing company if found.
- Users may save the books into their own local, personalized "Reading List".
- Users may view their "Reading List".

## Development
**The text template**
I first started with templates for each of the different "views" that the user will see in the terminal. Clearing the console before rendering each view was a design choice made to simplify and clean up the UI for the user.
<br>
**Main Menu**
```
Welcome to Google Books Finder Command Line App
Please choose an option below
- Search for a book by title
- Search for a book by author
- Search for a book by subject
- Search for a book by title and author
- View my reading list
```
I opted to allow 4 different ways to search for books given Google Book API's query parameters after determining the common ways people would opt to search for a book. Since only 5 options are returned, the fourth option (searching by title and author) was included to allow for more specifity if the user is looking for a particular book.

**Searching view**
```
Search By Book <option>
What is the <option> of the book? (input)
```

**No results error handling view**
```
No results found! Please try a different query.
// prompt user to query again
``` 

**Results view**
```
Would you like to add any to your reading list?
1. <Title> by <Author(s)> published by <Publisher>
2. <Title> by <Author(s)> published by <Publisher>
3. <Title> by <Author(s)> published by <Publisher>
4. <Title> by <Author(s)> published by <Publisher>
5. <Title> by <Author(s)> published by <Publisher>
```

**Reading List error handling view**
```
Your reading list is empty! Redirecting you to the main menu...
// redirect user to main menu
```

**Reading List view**
```
Your reading list:
1. <Title> by <Author(s)> published by <Publisher>
2. <Title> by <Author(s)> published by <Publisher>
```

**Handling options and input using inquire code snippets**
<br>
Utilized async functions to handle promises with await.

```js
export async function mainMenu() {
  const options = [
    "Search for a book by title",
    "Search for a book by author",
    "Search for a book by subject",
    "Search for a book by title and author",
    "View my reading list",
  ];

  const choice = await inquirer.prompt({
    name: "Main Menu",
    type: "list",
    message: "Please choose an option below",
    choices: options,
  });

  // convert user input into an index of options
  let index = options.indexOf(choice["Main Menu"]);

  return index;
}
```

```js
export async function searchByTitle() {
  const res = await inquirer.prompt({
    name: "title",
    type: "input",
    message: "What is the title of the book?",
  });

  return res.title;
}
```

**Handling the reading list**
<br>
Utilized JavaScript class and class functions to manage the list
```js
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
```

## Potential future features
- Enable user login to save local reading lists even after exiting the application
- Enable searching through reading list
