import inquirer from "inquirer";
import chalk from "chalk";

export function showReadingList(list) {
  console.clear();
  console.log(chalk.blue.bold("Your reading list:"));

  list.readingList.forEach((item, i) => {
    console.log(`${i + 1}.${item}`);
  });
}

export async function returnToMenuPrompt() {
  const res = await inquirer.prompt({
    name: "return",
    type: "input",
    message: "Press Enter to return to main menu",
  });

  return res.return;
}
