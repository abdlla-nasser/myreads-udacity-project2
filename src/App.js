import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { debounceTime, distinctUntilChanged, map, filter, switchMap } from "rxjs/operators";
import "./App.css";
import * as Api from "./BooksAPI";
import { BookShelf } from "./components/BookShelf";
import { SearchPage } from "./components/SearchPage";

function App() {
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([])
  useEffect(() => {
    if (subject === null) {
      const sub = new BehaviorSubject('')
      setSubject(sub)
    } else {
      const observable = subject.pipe(
        map(s => s.trim()),
        filter(s => s.length >= 2),
        distinctUntilChanged(),
        debounceTime(500),
        switchMap(term => Api.search(term))
      ).subscribe(data => {
        setLoading(false)
        setSearchData(data)
      })
      return () => {
        observable.unsubscribe();
        subject.unsubscribe();
      }
    } 
  }, [subject])
  const handleSearch = term => {
    setLoading(true)
    return subject ? subject.next(term) : null;
  }
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [shelves, setShelves] = useState([]);
  useEffect(() => {
    Api.getAll()
      .then((res) => {
        const books = res.map((book) => {
          let author = book.authors
            .reduce((acc, currentValue) => `${acc} ${currentValue},`, "")
            .trim();
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
      setShelves(shelves);
    });
  }, []);
  return (
    <div className="App">
      {showSearchPage ? (
        <SearchPage handleSearch={handleSearch} searchData={searchData} setShowSearchPage={setShowSearchPage} />
      ) : (
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
                    setShelves={setShelves}
                  />
                ))}
            </div>
          </div>
          <div className="open-search">
            <button onClick={() => setShowSearchPage(true)}>Add a book</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
