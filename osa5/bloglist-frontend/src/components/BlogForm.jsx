import { useState } from 'react'



const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newUser, setNewUser] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewBlogTitle('')
    setNewAuthor('')
    setNewUrl('')

  }

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handeAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handeUrlChange = (event) => {
    setNewUrl(event.target.value)
  }



  return (

    <form onSubmit={addBlog}>
      <div>Title:<input
        value={newBlogTitle}
        onChange={handleBlogTitleChange}
        placeholder='title'
      /></div>
      <div>Author:<input
        value={newAuthor}
        onChange={handeAuthorChange}
        placeholder='author'
      /></div>
      <div>Url:<input
        value={newUrl}
        onChange={handeUrlChange}
        placeholder='url'
      /></div>
      <button type="submit">create</button>
    </form>
  )
}


export default BlogForm