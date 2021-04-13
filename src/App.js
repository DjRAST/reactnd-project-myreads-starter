import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './api/BooksAPI';
import MyReadsPage from './pages/MyReadsPage';
import SearchPage from './pages/SearchPage';
import FullScreenLoadingSpinner from './components/FullScreenLoadingSpinner';

class BooksApp extends Component {
  state = {
    currentBookshelf: [],
    isLoading: true,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({
      currentBookshelf: books,
      isLoading: false,
    }));
  }

  addBookFromServer(bookId) {
    BooksAPI.get(bookId).then((newBook) => this.setState((currState) => ({
      currentBookshelf: [...currState.currentBookshelf, newBook],
      isLoading: false,
    })));
  }

  updateBookFromServer(bookId) {
    BooksAPI.get(bookId).then((updatedBook) => this.setState((currState) => ({
      currentBookshelf: currState.currentBookshelf.map((bookInShelf) => bookInShelf.id === updatedBook.id ? updatedBook : bookInShelf),
      isLoading: false,
    })));
  }

  moveBook = (movedBook, newShelfValue) => {
    this.setState({
      isLoading: true,
    })

    BooksAPI.update(movedBook, newShelfValue)
      .then(() => {
        if (!this.state.currentBookshelf.find((bookInShelf) => bookInShelf.id === movedBook.id)) {
          this.addBookFromServer(movedBook.id);
        } else {
          this.updateBookFromServer(movedBook.id);
        }
      });
  };

  render() {
    const {
      currentBookshelf,
      isLoading,
    } = this.state;

    return (
      <div className="app">
        {isLoading && <FullScreenLoadingSpinner />}
        <Route
          path={['/', '/myReads']}
          exact
          render={() => (
            <MyReadsPage
              currentBookshelf={currentBookshelf}
              onBookMoved={this.moveBook}
            />
          )}
        />
        <Route
          path="/search"
          exact
          render={() => (
            <SearchPage
              currentBookshelf={currentBookshelf}
              onBookMoved={this.moveBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
