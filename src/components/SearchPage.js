import { useState } from "react";
import { useHistory } from "react-router";
import { BookShelf } from "./BookShelf";

export const SearchPage = ({ handleSearch, books, searchData, shelves, setShelves }) => {
  const history = useHistory()
  const getNewBooks = (books, searchData) => {
    let newBooks = [...searchData];
    newBooks.forEach((item) => {
      let end = books.find((book) => book.id === item.id);
      if (end) newBooks.splice(searchData.indexOf(item), 1, end);
    });
    return newBooks
  } 
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => history.push("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchData.error && (
          <div>
            Your Search didn't match any results, search for another term
          </div>
        )}
        {searchData.length && books.length && (
          <BookShelf
            searchResults={getNewBooks(books, searchData)}
            shelves={shelves}
            setShelves={setShelves}
          />
        )}
      </div>
    </div>
  );
};
