export function logAddBooksMessage(titles, amount) {
  if (amount === 0) {
    console.log("No books were added to your list.");
  } else if (amount === 1) {
    console.log(`${titles} was added to your list.`);
  } else {
    console.log(`${titles} were added to your list.`);
  }
}
