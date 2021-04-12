import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { availableShelves } from '../config/appConfig';


export const bookPropTypes = {
  authors: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  inShelf: PropTypes.string,
  onShelfSelected: PropTypes.func,
  title: PropTypes.string,
}

class Book extends Component {
  render () {
    const {
      authors,
      imageUrl,
      inShelf,
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
            <select
              onChange={(event) => this.props.onShelfSelected(event.target.value)}
              value={inShelf}
            >
              <option value="move" disabled>Move to...</option>
              {availableShelves.map((shelfConfig) => (
                <option
                  key={shelfConfig.value}
                  value={shelfConfig.value}>
                  {shelfConfig.name}
                </option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors.map((author) => (
          <div key={author} className="book-authors">{author}</div>
        ))}
      </div>
    )
  }
}

Book.propTypes = bookPropTypes;
export default Book;