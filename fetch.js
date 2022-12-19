import fetch from "node-fetch";

export async function getBooks(query, queryType) {
  let url = "https://www.googleapis.com/books/v1/volumes?q=";

  url = `${url}${queryType}:${query}`;

  const res = await fetch(url, {
    method: "GET",
  });
  let data = await res.json();

  // TODO need a handler for no results
  console.log(data.totalItems);

  let top5 = data.items.slice(0, 5);

  top5.forEach((res, i) => {
    const book = res.volumeInfo;

    const title = book.title;
    const authors = book.authors.join(", ");
    let publisher = book.publisher;
    if (!publisher) publisher = "No Publisher Found";

    console.log(`${i + 1}: ${title} by ${authors} published by ${publisher}`);
  });
}

export async function getBooksByTitleAndAuthor(query) {
  // deconstruct the query array into title and author
  const [title, author] = query;

  let url = "https://www.googleapis.com/books/v1/volumes?q=";

  url = `${url}intitle:${title}+inauthor:${author}`;

  const res = await fetch(url, {
    method: "GET",
  });
  let data = await res.json();

  // TODO need a handler for no results
  console.log(data.totalItems);

  let top5 = data.items.slice(0, 5);

  top5.forEach((res, i) => {
    const book = res.volumeInfo;

    const title = book.title;
    const authors = book.authors.join(", ");
    let publisher = book.publisher;
    if (!publisher) publisher = "No Publisher Found";

    console.log(`${i + 1}: ${title} by ${authors} published by ${publisher}`);
  });
}
