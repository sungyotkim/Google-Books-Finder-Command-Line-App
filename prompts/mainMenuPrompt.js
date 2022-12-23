import inquirer from "inquirer";

export async function mainMenuPrompt() {
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

  let index = options.indexOf(choice["Main Menu"]);

  return index;
}
