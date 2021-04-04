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
const shelvesNames = ["currentlyReading", "wantToRead", "read"];

function App() {
  const [subject, setSubject] = useState(null);
  const [shelves, setShelves] = useState([]);
  const [books, setBooks] = useState([])
  const [searchData, setSearchData] = useState([]);
  const handleSearch = (term) => {
    if(subject && term.length > 2) return subject.next(term)
    else setSearchData([]);
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
        };
      });
      const shelves = shelvesNames.map((shelf) => {
        const shelfBooks = books.filter((book) => book.shelf === shelf);
        return {
          title: shelf,
          books: shelfBooks ? shelfBooks : [],
        };
      });
      console.log(shelvesOrder(shelves))
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
          distinctUntilChanged(),
          debounceTime(200),
          filter((s) => s.length >= 2),
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
            setSearchData={setSearchData}
            searchData={searchData}
            shelves={shelves}
            books={books}
            setShelves={(e) => setShelves(shelvesOrder(e))}
          />
        </Route>
        <Route exact path="/">
          <Home shelves={shelves} setShelves={setShelves} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
