export function addBooksToReadingList(books, list) {
  console.clear();

  books.forEach((book) => {
    list.readingList.push(book);
  });
}
