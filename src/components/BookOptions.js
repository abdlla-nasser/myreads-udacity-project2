import React, { useState } from "react";
import { update } from "../BooksAPI";
// const removeBook = (bookId, shelf, shelves) => {
//   let newShelves = [...shelves];
//   const newFromShelf = 
//   return newShelves;
// };
export const BookOptions = ({
  setShelves,
  selectedOption,
  shelves,
  book,
  shelf,
}) => {
  const [selected, setSelected] = useState(
    selectedOption ? selectedOption : "none"
  );
  const handleChange = ({target: {value}}) => {
    if (book.shelf === value) return;
    update(book, value).then(() => setSelected(value));
    console.log(shelf)
    const newBook = { ...book, shelf: value };
    const newFromShelf = {
      ...shelf,
      books: shelf.books ? [...shelf.books.filter((book) => book.id !== newBook.id)] : [],
    }
    const toShelf = shelves.find((shelf) => shelf.title === value);
    if (toShelf) {
      const newToShelf = { ...toShelf, books: [...toShelf.books, newBook] };      
      if (!shelf.books) {
        const newShelves = shelves.filter(
          (shelf) => shelf.title !== toShelf.title
        );
        setShelves([...newShelves, newToShelf]);
      } else {
        const newShelves = shelves.filter(
          (shelf) =>
            shelf.title !== newFromShelf.title && shelf.title !== toShelf.title
        );
        setShelves([...newShelves, newToShelf, newFromShelf]);
      }
    } else setShelves([...shelves.filter(shelf => shelf.title !== newFromShelf.title), newFromShelf ])
  };
  return (
    <select value={selected} onChange={handleChange}>
      <option value="move" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  );
};
