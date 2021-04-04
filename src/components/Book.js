import React from "react";
import { BookOptions } from "./BookOptions";

export const Book = ({ book, setShelves, shelves, bookShelf }) => {
  const { imageLinks , shelf, title, author } = book;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 174,
              backgroundImage: `url(${imageLinks ? imageLinks.thumbnail : ""})`,
            }}
          />
          <div className="book-shelf-changer">
            <BookOptions
              value={shelf}
              selectedOption={shelf}
              setShelves={setShelves}
              shelves={shelves}
              book={book}
              shelf={bookShelf}
            />
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    </li>
  );
};