import { Link } from "react-router-dom";
import { BookShelf } from "./BookShelf";
import { shelvesOrder } from "../App";

export const Home = ({ shelves, setShelves }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.length > 0 &&
            shelves.map((shelf) => (
              <BookShelf
                key={shelf.title}
                shelves={shelves}
                shelf={shelf}
                setShelves={(e) => setShelves(shelvesOrder(e))}
              />
            ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add A book</Link>
      </div>
    </div>
  );
};