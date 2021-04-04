import { Book } from "./Book";

export const BookShelf = ({ shelf = { title: "Search Results" }, setShelves, shelves, searchResults }) => {
  const { title, books } = shelf
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {title !== "Search Results"
            ? books.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  setShelves={setShelves}
                  shelves={shelves}
                  bookShelf={shelf}
                />
              ))
            : searchResults.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  setShelves={setShelves}
                  shelves={shelves}
                  bookShelf={shelf}
                />
              ))}
        </ol>
      </div>
    </div>
  );
}
 