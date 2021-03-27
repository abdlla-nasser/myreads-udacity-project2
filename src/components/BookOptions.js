import React, { useState } from "react";

export const BookOptions = ({ setShelves, selectedOption, shelves, book, shelf }) => {
  const [selected, setSelected] = useState(
   selectedOption ? selectedOption : "none"
  );
  const handleChange = (e) => {
    if(book.shelf === e.target.value) return
    const newBook = { ...book, shelf: e.target.value }
    const newFromShelf = { ...shelf, books: [...shelf.books.filter(book => book.id !== newBook.id)] }
    const toShelf = shelves.find(shelf => shelf.title === e.target.value);
    const newToShelf = { ...toShelf, books: [...toShelf.books, newBook] }
    const newShelves = shelves.filter(shelf => shelf.title !== newFromShelf.title && shelf.title !== toShelf.title)
    setShelves([...newShelves, newToShelf, newFromShelf])
  }
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
