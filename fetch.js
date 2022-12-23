import fetch from "node-fetch";

export async function getBooks(query, queryType, searchSpinner) {
  searchSpinner.start();
  let url = "https://www.googleapis.com/books/v1/volumes?q=";

  url = `${url}${queryType}:${query}`;

  try {
    const res = await fetch(url, {
      method: "GET",
    });

    const data = await res.json();

    if (data.totalItems === 0) return null;

    const top5 = data.items.slice(0, 5);

    return top5;
  } catch (err) {
    return "error";
  }
}

export async function getBooksByTitleAndAuthor(query, searchSpinner) {
  searchSpinner.start();
  const [title, author] = query;

  let url = "https://www.googleapis.com/books/v1/volumes?q=";

  url = `${url}intitle:${title}+inauthor:${author}`;

  try {
    const res = await fetch(url, {
      method: "GET",
    });
    const data = await res.json();

    if (data.totalItems === 0) return null;

    const top5 = data.items.slice(0, 5);

    return top5;
  } catch (err) {
    return "error";
  }
}
