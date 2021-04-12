import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import Bookshelf from './Bookshelf';

export const bookPropTypes = {
  authors: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  title: PropTypes.string,
}

class Book extends Component {
  render () {
    const {
      authors,
      imageUrl,
      title,
    } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageUrl}")`,
          }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors.map((author) => (
          <div className="book-authors">{author}</div>
        ))}
      </div>
    )
  }
}

Book.propTypes = bookPropTypes;

export default Book;