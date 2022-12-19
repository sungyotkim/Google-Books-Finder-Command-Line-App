export function handleResults(searchResults) {
  console.clear();

  searchResults.forEach((res, i) => {
    const book = res.volumeInfo;

    const title = book.title;
    const authors = book.authors.join(", ");
    let publisher = book.publisher;
    if (!publisher) publisher = "No Publisher Found";

    console.log(`${i + 1}: ${title} by ${authors} published by ${publisher}`);
  });
}
