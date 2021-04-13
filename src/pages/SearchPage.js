import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import * as BooksAPI from '../api/BooksAPI';
import Book from '../components/Book';
import { bookshelfPropTypes } from '../components/Bookshelf';
import FullScreenLoadingSpinner from '../components/FullScreenLoadingSpinner';

export const searchPagePropTypes = {
  currentBookshelf: PropTypes.arrayOf(PropTypes.shape(bookshelfPropTypes.books)).isRequired,
  onBookMoved: PropTypes.func.isRequired,
};

class SearchPage extends Component {
  state = {
    isLoading: false,
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
    this.setState({
      isLoading: true,
    });

    BooksAPI.search(this.state.searchQuery).then((searchResults) => {
      const {
        currentBookshelf,
      } = this.props;

      // merge results with local shelf data to get correct shelf value
      this.setState({
        isLoading: false,
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
      isLoading,
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
        {isLoading && <FullScreenLoadingSpinner/>}
        <div className="search-books-bar">
          <Link to="/myReads">
            <button className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
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