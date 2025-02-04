import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Book from './Book';

export const bookshelfPropTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    authors: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
    imageLinks: PropTypes.shape({
      smallThumbnail: PropTypes.string,
    }),
    title: PropTypes.string,
  })).isRequired,
  onBookMoved: PropTypes.func.isRequired,
  shelfName: PropTypes.string.isRequired,
  shelfValue: PropTypes.string.isRequired,
};

class Bookshelf extends Component {
  render() {
    const {
      books,
      onBookMoved,
      shelfName,
      shelfValue,
    } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book
                  authors={book.authors}
                  imageUrl={book.imageLinks && book.imageLinks.smallThumbnail}
                  inShelf={shelfValue}
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

Bookshelf.propTypes = bookshelfPropTypes;
export default Bookshelf;