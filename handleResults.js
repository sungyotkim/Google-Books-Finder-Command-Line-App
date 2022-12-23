import inquirer from "inquirer";

export async function handleResults(searchResults) {
  console.clear();

  const resultsDisplay = [];

  searchResults.forEach((res) => {
    const book = res.volumeInfo;

    const title = book.title;
    const authors = book.authors ? book.authors.join(", ") : "no author found";
    const publisher = book.publisher ? book.publisher : "no publisher found";

    resultsDisplay.push(` ${title} by ${authors} published by ${publisher}`);
  });

  const choice = await inquirer.prompt({
    name: "results",
    type: "checkbox",
    message: "Would you like to add any to your reading list?",
    choices: resultsDisplay,
  });

  const res = choice.results;

  const titles = [];

  res.forEach((book) => {
    let split = book.split(" by");
    titles.push(split[0].slice(1));
  });

  return [res, titles.join(", ")];
}
