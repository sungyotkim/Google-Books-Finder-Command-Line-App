export function addToDisplay(results) {
  const resultsDisplay = [];

  results.forEach((res) => {
    const book = res.volumeInfo;

    const title = book.title;
    const authors = book.authors ? book.authors.join(", ") : "no author found";
    const publisher = book.publisher ? book.publisher : "no publisher found";

    resultsDisplay.push(` ${title} by ${authors} published by ${publisher}`);
  });

  return resultsDisplay;
}
