import { useState } from "react";
import { search } from "../BooksAPI";
import { BookShelf } from "./BookShelf";

export const SearchPage = ({ setShowSearchPage, handleSearch, searchData }) => {
  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button
          className="close-search"
          onClick={() => setShowSearchPage(false)}
        >
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            value={query}
            onChange={handleInputChange}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchData.error && <div>Your Search didn't match any results, search for another term</div>}
        {searchData.length && <BookShelf searchResults={searchData} />}
      </div>
    </div>
  );
};
