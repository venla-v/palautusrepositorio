import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, user, handleLikeChange, deleteBlog }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }


  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}<button onClick={() => setInfoVisible(true)}>view</button>
      </div>
      {infoVisible && 
      <div style={showWhenVisible}>
        <div>{blog.title} {blog.author}<button onClick={() => setInfoVisible(false)}>hide</button></div>
        <div> {blog.url}</div>
        <div>likes: {blog.likes}<button onClick={() => handleLikeChange(blog)}>like </button></div>
        <div> {blog.user.name}</div>
        {user.username === blog.user.username && (
          <button onClick={() => deleteBlog(blog)}>remove</button>)}
      </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikeChange: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog