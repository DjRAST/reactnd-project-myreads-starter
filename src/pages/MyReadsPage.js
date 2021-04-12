import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import Bookshelf from '../components/Bookshelf'
import { availableShelves } from '../config/appConfig';


class MyReadsPage extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({
      books,
    }));
  }

  moveBook = (movedBook, newShelfValue) => {
    BooksAPI.update(movedBook, newShelfValue)
      .then(() => this.setState((currentState) => ({
          books: currentState.books.map((book) => {
            return book.id === movedBook.id ?
              {
                ...book,
                shelf: newShelfValue,
              } : book
          })
        }))
      )
  }

  render() {
    const {
      books
    } = this.state

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {availableShelves.map((shelfConfig) => (
            <Bookshelf
              key={shelfConfig.value}
              books={books.filter((book) => book.shelf === shelfConfig.value)}
              onBookMoved={this.moveBook}
              shelfName={shelfConfig.name}
              shelfValue={shelfConfig.value}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">
            <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MyReadsPage;