import inquirer from "inquirer";

function handleChoice(idx) {
  switch (idx) {
    case 0:
      // handle search by title
      break;
    case 1:
      // handle search by author
      break;
    case 2:
      // handle search by subject
      break;
    case 3:
      // handle search by title and author
      break;
    case 4:
      // handle view reading list
      break;
    default:
      return;
  }
}

export async function mainMenu() {
  console.log("this is the main menu");

  // await menuOptions();
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

  return handleChoice(index);
}
