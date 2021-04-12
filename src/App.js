import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import MyReadsPage from './pages/myReads/MyReadsPage'
import SearchPage from './pages/myReads/SearchPage'

class BooksApp extends Component {
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
