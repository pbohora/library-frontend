import React, { useState, useEffect } from 'react'

import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const Authors = ({ authors, show }) => {
  const [name, setName] = useState('select one')
  const [born, setBorn] = useState('')
  const [editAuthor, result] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      console.log('name not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async event => {
    event.preventDefault()

    editAuthor({ variables: { name, born } })

    setName('select name')
    setBorn('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <div>
          author
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value='slelct one'>select one</option>
            {authors.map(author => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>

        <button type='submit'>edit author</button>
      </form>
    </div>
  )
}

export default Authors
