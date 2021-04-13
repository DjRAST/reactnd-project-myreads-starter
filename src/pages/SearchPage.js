import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import * as BooksAPI from '../api/BooksAPI';
import Book from '../components/Book';
import { bookshelfPropTypes } from '../components/Bookshelf';

export const searchPagePropTypes = {
  currentBookshelf: PropTypes.arrayOf(PropTypes.shape(bookshelfPropTypes.books)).isRequired,
  onBookMoved: PropTypes.func.isRequired,
};

class SearchPage extends Component {
  state = {
    searchQuery: '',
    searchBookResults: [],
  };

  debounceTimer = null;

  mergeBooks(booksInShelf = [], booksFromSearch = []) {
    return booksFromSearch.map((bookFromSearch) => {
      const bookInShelf = booksInShelf.find((bookInShelf) => bookInShelf.id === bookFromSearch.id);
      return bookInShelf ? bookInShelf : bookFromSearch;
    });
  }

  lookupBooks = () => {
    BooksAPI.search(this.state.searchQuery).then((searchResults) => {
      const {
        currentBookshelf,
      } = this.props;

      // merge results with local shelf data to get correct shelf value
      this.setState({
        searchBookResults: this.mergeBooks(currentBookshelf, searchResults),
      });
    });
  };

  onSearchQueryChanged = (event) => {
    const newQuery = event.target.value;
    this.setState({
      searchQuery: newQuery,
    });

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.lookupBooks(), 400);
  };

  render() {
    const {
      searchQuery,
      searchBookResults,
    } = this.state;

    const {
      onBookMoved,
      currentBookshelf,
    } = this.props;

    const mergedBooks = this.mergeBooks(currentBookshelf, searchBookResults);

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
            {mergedBooks.map((book) => (
              <li key={book.id}>
                <Book
                  authors={book.authors}
                  imageUrl={book.imageLinks.smallThumbnail}
                  inShelf={book.shelf}
                  title={book.title}
                  onShelfSelected={(newShelfValue) => onBookMoved(book, newShelfValue)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = searchPagePropTypes;
export default SearchPage;