export function convertToTitles(books) {
  const titles = [];

  books.forEach((book) => {
    let split = book.split(" by");
    titles.push(split[0].slice(1));
  });

  return titles.join(", ");
}
