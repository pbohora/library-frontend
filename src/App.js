import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

import { ALL_AUTHORS, ALL_BOOKS, GET_ME, GENRES_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  const book = useQuery(ALL_BOOKS)
  const me = useQuery(GET_ME)

  console.log('me', me)

  const client = useApolloClient()

  console.log(book)

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  console.log(token)

  const genreBook = useQuery(GENRES_BOOKS, {
    variables: { genre: genre },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: GENRES_BOOKS })
      dataInStore.allBooks.push(response.data.addBook)
      store.writeQuery({
        query: GENRES_BOOKS,
        data: dataInStore,
      })
    },
  })

  if (result.loading || book.loading) {
    return <div>loading...</div>
  }

  const genreHandle = (genre) => {
    setGenre(genre)
  }

  const recommendHandle = (genre) => {
    setGenre(genre)
    setPage('recommendation')
  }

  console.log('genre', genre)

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
          <>
            <button onClick={() => recommendHandle(me.data.me.favoriteGenre)}>
              recommendations
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books
        show={page === 'books'}
        books={genreBook.data.allBooks}
        genreHandle={genreHandle}
        genre={genre}
      />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} />

      <Recommend
        show={page === 'recommendation'}
        books={genreBook.data.allBooks}
        genre={genre}
      />
    </div>
  )
}

export default App
