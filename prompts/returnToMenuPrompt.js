import inquirer from "inquirer";

export async function returnToMenuPrompt() {
  const res = await inquirer.prompt({
    name: "return",
    type: "input",
    message: "Press Enter to return to main menu",
  });

  return res.return;
}
