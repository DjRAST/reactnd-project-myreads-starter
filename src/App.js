import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import MyReadsPage from './pages/myReads/MyReadsPage'
import SearchPage from './pages/myReads/SearchPage'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        <Route path={['/', '/myReads']} exact component={MyReadsPage} />
        <Route path='/search' exact component={SearchPage} />
      </div>
    )
  }
}

export default BooksApp
