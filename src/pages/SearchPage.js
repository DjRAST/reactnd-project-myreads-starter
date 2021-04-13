import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';
import * as BooksAPI from '../api/BooksAPI';

class SearchPage extends Component {
  state = {
    searchQuery: '',
    searchBookResults: [],
  };

  debounceTimer = null;

  lookupBooks = () => {
    BooksAPI.search(this.state.searchQuery).then((result) => {
      this.setState({
        searchBookResults: result,
      })
    })
  };

  onSearchQueryChanged = (event) => {
    const newQuery = event.target.value;
    this.setState({
      searchQuery: newQuery,
    });

    clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(() => this.lookupBooks(), 400)
  };

  moveBook = (movedBook, newShelfValue) => {
    BooksAPI.update(movedBook, newShelfValue)
      .then(() => this.setState((currState) => ({
        searchBookResults: [...currState.searchBookResults].map((book) => {
          return book.id === movedBook.id ?
            {
              ...book,
              shelf: newShelfValue,
            } : book;
        }),
      })));
  };

  render() {
    const {
      searchQuery,
      searchBookResults,
    } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/myReads">
            <button className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" value={searchQuery}
                   onChange={this.onSearchQueryChanged}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBookResults.map((book) => (
              <li key={book.id}>
                <Book
                  authors={book.authors}
                  imageUrl={book.imageLinks.smallThumbnail}
                  inShelf={book.shelf}
                  title={book.title}
                  onShelfSelected={(newShelfValue) => this.moveBook(book, newShelfValue)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;