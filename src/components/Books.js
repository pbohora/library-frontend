import React, { useState } from 'react'
import { GENRES_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = ({ books, show }) => {
  const [genres, setGenres] = useState(null)

  const result = useQuery(GENRES_BOOKS, {
    variables: { genre: genres },
  })

  console.log(result)

  if (!show) {
    return null
  }

  // const filteredBook = books.filter(
  //   (book) => genres === '' || book.genres.includes(genres)
  // )

  // console.log('filter', filteredBook)

  return (
    <div>
      <h2>books</h2>
      <p>
        in genres <strong>{genres === '' ? 'all' : genres}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenres('refactoring')}>refactoring</button>
        <button onClick={() => setGenres('database')}>database</button>
        <button onClick={() => setGenres('nosql')}>nosql</button>
        <button onClick={() => setGenres('fullstack')}>fullstack</button>
        <button onClick={() => setGenres('crime')}>crime</button>
        <button onClick={() => setGenres('type')}>type</button>
      </div>
    </div>
  )
}

export default Books
