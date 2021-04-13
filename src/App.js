import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import MyReadsPage from './pages/MyReadsPage';
import SearchPage from './pages/SearchPage';
import * as BooksAPI from './api/BooksAPI';

class BooksApp extends Component {
  state = {
    currentBookshelf: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({
      currentBookshelf: books,
    }));
  }

  addBookFromServer(bookId) {
    BooksAPI.get(bookId).then((newBook) => this.setState((currState) => ({
      currentBookshelf: [...currState.currentBookshelf, newBook],
    })));
  }

  updateBookFromServer(bookId) {
    BooksAPI.get(bookId).then((updatedBook) => this.setState((currState) => ({
      currentBookshelf: currState.currentBookshelf.map((bookInShelf) => bookInShelf.id === updatedBook.id ? updatedBook : bookInShelf),
    })));
  }

  moveBook = (movedBook, newShelfValue) => {
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
    } = this.state;

    return (
      <div className="app">
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
