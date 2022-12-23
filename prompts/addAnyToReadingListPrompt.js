import inquirer from "inquirer";

export async function addAnyToReadingListPrompt(display) {
  const choice = await inquirer.prompt({
    name: "results",
    type: "checkbox",
    message: "Would you like to add any to your reading list?",
    choices: display,
  });

  return choice.results;
}
