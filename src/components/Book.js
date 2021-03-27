import React from "react";
import { BookOptions } from "./BookOptions";

export const Book = ({ book, setShelves, shelves, shelf }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 174,
              backgroundImage: `url(${book.cover ? book.cover : book.imageLinks.thumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <BookOptions value={book.shelf} selectedOption={book.shelf} setShelves={setShelves} shelves={shelves} book={book} shelf={shelf}/>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  );
};