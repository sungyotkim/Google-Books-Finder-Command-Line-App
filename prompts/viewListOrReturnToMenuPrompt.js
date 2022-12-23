import inquirer from "inquirer";

export async function viewListOrReturnToMenuPrompt() {
  const nextOptions = ["View my reading list.", "Return to main menu."];

  const option = await inquirer.prompt({
    name: "next",
    type: "list",
    message: "What would you like to do next?",
    choices: nextOptions,
  });

  return option.next;
}
