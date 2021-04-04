import React, { useState } from "react";
import { update } from "../BooksAPI";
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
  const handleChange = (e) => {
    if (book.shelf === e.target.value) return;
    update(book, e.target.value).then(() => setSelected(e.target.value));
    const newBook = { ...book, shelf: e.target.value };
    const newFromShelf = shelf.books 
      ? {
          ...shelf,
          books: [...shelf.books.filter((book) => book.id !== newBook.id)],
        }
      : {};
    const toShelf = shelves.find((shelf) => shelf.title === e.target.value);
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
