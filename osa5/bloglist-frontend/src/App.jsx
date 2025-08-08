import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogsVisible, setBlogsVisible] = useState(false)

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
    blogService.setToken(user.token)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('wrong username or password')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }

  const addBlog = (blogObject) => {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
  
        setBlogsVisible(false)  
        
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
      setMessage(null)
    }, 5000)
      })
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

  if (user === null) {
    return (
    <div>
      <Error message={errorMessage} />
        <h2>Log in to application</h2>
          {!user && loginForm()}
      </div>
    )
  }

const blogForm = () => {
    const hideWhenVisible = { display: blogsVisible ? 'none' : '' }
    const showWhenVisible = { display: blogsVisible ? '' : 'none' }

return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogsVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setBlogsVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      
      <div>{logoutForm()}</div>

      {blogForm()}
      <h2>create new</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}
export default App