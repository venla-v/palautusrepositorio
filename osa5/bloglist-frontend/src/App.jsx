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
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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


  const deleteBlog = async (deletedBlog) => {

    const deletedid = deletedBlog.id
    const deletedUser = deletedBlog.user.username
    const thisUser = user.username

    console.log('logged-in user:', user)

    console.log('deleteBlog triggered')
    console.log(deletedUser)
    console.log(thisUser)


    if (window.confirm(`Remove blog ${deletedBlog.title} by ${deletedBlog.author}`)) {
      if (deletedUser === thisUser) {
        await blogService.remove(deletedBlog.id)
        blogService.getAll().then(blogs =>
          setBlogs( blogs.filter(b => b.id.toString() !== deletedid) )
        )
      } else {
        console.log('not possible to delete other users blogs')
      }
    } else {
      console.log('not possible to delete')
    }
  }

  const handleLikeChange = async (likedBlog) => {
    const updatedBlog = {
      id: likedBlog.id,
      title: likedBlog.title,
      author: likedBlog.author,
      url: likedBlog.url,
      user: likedBlog.user.id,
      likes: likedBlog.likes + 1
    }

    const returnedBlog = await blogService.update(likedBlog.id, updatedBlog)

    setBlogs(blogs.map(blog => {
      console.log( likedBlog.user)
      if (blog.id === likedBlog.id) {
        return {
          id: returnedBlog.id,
          title: returnedBlog.title,
          author: returnedBlog.author,
          url: returnedBlog.url,
          user: likedBlog.user,
          likes: returnedBlog.likes
        }} else {
        return blog
      }
    }
    ))

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

      <h2>create new</h2>
      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleLikeChange={handleLikeChange} deleteBlog={deleteBlog}/>
      )}
    </div>
  )

}
export default App