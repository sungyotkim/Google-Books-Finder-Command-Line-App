export function logAddBooksMessage(titles, amount) {
  switch (amount) {
    case 0:
      console.log("No books were added to your list.");
      break;
    case 1:
      console.log(`${titles} was added to your list.`);
      break;
    default:
      console.log(`${titles} were added to your list.`);
  }
}
