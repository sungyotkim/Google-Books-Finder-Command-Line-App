import chalk from "chalk";

export function showReadingList(list) {
  console.clear();
  console.log(chalk.blue.bold("Your reading list:"));

  list.readingList.forEach((item, i) => {
    console.log(`${i + 1}.${item}`);
  });
}
