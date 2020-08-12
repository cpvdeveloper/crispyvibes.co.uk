import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import css from './AddForm.module.css'

const ADD_BLOG_POST = gql`
  mutation AddBlogPost($title: String, $url: String) {
    insert_blog_posts_one(object: { title: $title, url: $url }) {
      id
    }
  }
`

function AddForm() {
  const [addBlogPost] = useMutation(ADD_BLOG_POST)
  const initialForm = {
    title: '',
    url: '',
    authorization: '',
  }
  const [form, setForm] = useState(initialForm)
  const [fetchError, setFetchError] = useState(false)

  const resetForm = () => {
    setForm(initialForm)
    setFetchError(false)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setForm(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      const { title, url, authorization } = form
      if (authorization === process.env.GATSBY_ADD_BLOG_AUTH) {
        await addBlogPost({ variables: { title, url } })
        resetForm()
      } else {
        throw new Error('Not authorized')
      }
    } catch (err) {
      setFetchError(true)
    }
  }

  return (
    <div className={css.addForm}>
      <input
        name="title"
        value={form.title}
        placeholder="Title"
        onChange={handleInputChange}
      />
      <textarea
        name="url"
        value={form.url}
        placeholder="URL"
        rows="2"
        onChange={handleInputChange}
      />
      <input
        name="authorization"
        value={form.authorization}
        placeholder="Authorization"
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Add blog post</button>
      {fetchError && (
        <div className={css.errorMessage}>Unable to add blog post</div>
      )}
    </div>
  )
}

export { AddForm }
