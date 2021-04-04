import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { BehaviorSubject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
  switchMap,
} from "rxjs/operators";
import { Home } from "./components/Home";
import { SearchPage } from "./components/SearchPage";
import * as Api from "./BooksAPI";
import "./App.css";

export const shelvesOrder = (shelves) => {
  const ordered = []
  const order = ["currentlyReading", "wantToRead", "read"]
  shelves.forEach((shelf) => {
    let position = order.indexOf(shelf.title)
    ordered[position] = shelf
  })
  return ordered
}

function App() {
  const [subject, setSubject] = useState(null);
  const [shelves, setShelves] = useState([]);
  const [books, setBooks] = useState([])
  const [searchData, setSearchData] = useState([]);
  const handleSearch = (term) => {
    return subject ? subject.next(term) : null;
  };
  useEffect(() => {
    Api.getAll().then((res) => {
      const books = res.map((book) => {
        let author = book.authors ? book.authors
          .reduce((acc, currentValue) => `${acc} ${currentValue},`, "")
          .trim() : ""
        return {
          ...book,
          author: author.substring(0, author.length - 1),
          cover: book.imageLinks.thumbnail,
        };
      });
      const shelvesNames = [
        ...new Set(
          books.reduce((acc, currVal) => {
            return [...acc, currVal.shelf];
          }, [])
        ),
      ];
      const shelves = shelvesNames.map((shelf) => {
        return {
          title: shelf,
          books: books.filter((book) => book.shelf === shelf),
        };
      });
      setBooks(res)
      setShelves(shelvesOrder(shelves));
    });
  }, []);
  useEffect(() => {
    if (subject === null) {
      const sub = new BehaviorSubject("");
      setSubject(sub);
    } else {
      const observable = subject
        .pipe(
          map((s) => s.trim()),
          filter((s) => s.length >= 2),
          distinctUntilChanged(),
          debounceTime(500),
          switchMap((term) => Api.search(term))
        )
        .subscribe(setSearchData);
      return () => {
        observable.unsubscribe();
        subject.unsubscribe();
      };
    }
  }, [subject]);
  return (
    <div className="App">
      <Router>
        <Route exact path="/search">
          <SearchPage
            handleSearch={handleSearch}
            searchData={searchData}
            shelves={shelves}
            books={books}
            setShelves={(e) => setShelves(shelvesOrder(e))}
          />
        </Route>
        <Route exact path="/"><Home shelves={shelves} setShelves={setShelves} /></Route>
      </Router>
    </div>
  )
}

export default App;
