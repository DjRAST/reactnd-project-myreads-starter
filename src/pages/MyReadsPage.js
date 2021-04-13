import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Bookshelf, { bookshelfPropTypes } from '../components/Bookshelf';
import { availableShelves } from '../config/appConfig';

export const myReadsPagePropTypes = {
  currentBookshelf: PropTypes.arrayOf(PropTypes.shape(bookshelfPropTypes.books)).isRequired,
};

class MyReadsPage extends Component {
  render() {
    const {
      currentBookshelf,
      onBookMoved,
    } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {availableShelves.map((shelfConfig) => (
            <Bookshelf
              key={shelfConfig.value}
              books={currentBookshelf.filter((book) => book.shelf === shelfConfig.value)}
              onBookMoved={onBookMoved}
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

MyReadsPage.propTypes = myReadsPagePropTypes;
export default MyReadsPage;