import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Book, { bookPropTypes } from './Book'

class Bookshelf extends Component {
  render () {
    const {
      shelfName,
      books,
    } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li>
                <Book title={book.title} authors={book.authors} imageUrl={book.imageLinks.smallThumbnail} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  shelfName: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.shape(bookPropTypes))
};

export default Bookshelf;