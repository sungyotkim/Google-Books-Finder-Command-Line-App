import inquirer from "inquirer";

export async function searchByTitle() {
  const res = await inquirer.prompt({
    name: "title",
    type: "input",
    message: "What is the title of the book?",
  });

  return res.title;
}

export async function searchByAuthor() {
  const res = await inquirer.prompt({
    name: "author",
    type: "input",
    message: "Who is the author?",
  });

  return res.author;
}

export async function searchBySubject() {
  const res = await inquirer.prompt({
    name: "subject",
    type: "input",
    message: "What is the subject/genre of the book?",
  });

  return res.subject;
}

export async function searchByTitleAndAuthor() {
  const titleRes = await inquirer.prompt({
    name: "title",
    type: "input",
    message: "What is the title of the book?",
  });

  const authorRes = await inquirer.prompt({
    name: "author",
    type: "input",
    message: "Who is the author?",
  });

  let res = [titleRes.title, authorRes.author];

  return res;
}
