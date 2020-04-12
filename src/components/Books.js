import React, { useState } from 'react'

const Books = ({ books, show, genre, genreHandle }) => {
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
        in genres <strong>{!genre ? 'all' : genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => genreHandle('refactoring')}>refactoring</button>
        <button onClick={() => genreHandle('database')}>database</button>
        <button onClick={() => genreHandle('nosql')}>nosql</button>
        <button onClick={() => genreHandle('fullstack')}>fullstack</button>
        <button onClick={() => genreHandle('crime')}>crime</button>
        <button onClick={() => genreHandle('type')}>type</button>
      </div>
    </div>
  )
}

export default Books
