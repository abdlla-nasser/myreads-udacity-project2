// import { useState } from "react";
import { Link } from "react-router-dom";
import { BookShelf } from "./BookShelf";

export const SearchPage = ({
  setSearchData,
  handleSearch,
  books,
  searchData,
  shelves,
  setShelves,
}) => {
  const getNewBooks = (books, searchData) => {
    let newBooks = [...searchData];
    newBooks.forEach((item) => {
      let end = books.find((book) => book.id === item.id);
      if (end) newBooks.splice(searchData.indexOf(item), 1, end);
    });
    return newBooks;
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
        to="/"
          className="close-search"
          onClick={() => {
            setSearchData([]);
          }}
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchData.length === 0 && (
          <div>Type a search term to display books</div>
        )}
        {searchData.error && (
          <div>
            Your Search didn't match any results, search for another term
          </div>
        )}
        {searchData.length ? (
          <BookShelf
            searchResults={getNewBooks(books, searchData)}
            shelves={shelves}
            setShelves={setShelves}
          />
        ) : null}
      </div>
    </div>
  );
};
