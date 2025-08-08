import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  
  try {
    const user = await loginService.login({
        username, password,
    })

    window.localStorage.setItem(
      'loggedBlogUser', JSON.stringify(user)
    ) 
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }
  

   const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleLogout = async () => {
   localStorage.clear()
  }

  const logoutForm= () => (
      <form onSubmit={handleLogout}>
      {user.name} logged in <button type="submit">logout</button>
    </form>
    )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>Title:<input
        value={newBlogTitle}
        onChange={handleBlogTitleChange}
      /></div>
      <div>Author:<input
        value={newAuthor}
        onChange={handeAuthorChange}
      /></div>
      <div>Url:<input
        value={newUrl}
        onChange={handeUrlChange}
      /></div>
      <button type="submit">create</button>
    </form>  
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newAuthor,
      url: newUrl
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
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

  if (user === null) {
    return (
    <div>
        <h2>Log in to application</h2>
          {!user && loginForm()}
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <div>{logoutForm()}</div>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App