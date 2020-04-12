import React from 'react'
import { GENRES_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = ({ me, show }) => {
  const recommend = useQuery(GENRES_BOOKS, {
    variables: { genre: me.favoriteGenre },
  })

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in oyur favorite genre <strong>{me.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommend.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
