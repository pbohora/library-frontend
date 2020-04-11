import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  const book = useQuery(ALL_BOOKS)

  const client = useApolloClient()

  console.log(book)

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (result.loading || book.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} books={book.data.allBooks} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App
