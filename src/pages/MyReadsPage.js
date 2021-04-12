import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import Bookshelf from '../components/Bookshelf'

const shelves = ['currentlyReading', 'wantToRead', 'read'];

class MyReadsPage extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({
      books,
    }));
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
          {shelves.map((shelfName) => (
            <Bookshelf
              books={books.filter((book) => book.shelf === shelfName)}
              shelfName={shelfName}
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