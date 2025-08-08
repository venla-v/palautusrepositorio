import { useState } from 'react'

const Blog = ({ blog }) => {
const [infoVisible, setInfoVisible] = useState(false)

const hideWhenVisible = { display: infoVisible ? 'none' : '' }
const showWhenVisible = { display: infoVisible ? '' : 'none' }


return (
  <div>
    <div style={hideWhenVisible}>
          {blog.title} {blog.author}<button onClick={() => setInfoVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible}>
         <div>{blog.title} {blog.author}<button onClick={() => setInfoVisible(false)}>hide</button></div>
         <div> {blog.url}</div>
         <div>likes: {blog.likes}<button onClick={() => setInfoVisible(true)}>like</button></div>
         <div> {blog.user.name}</div>
        </div>
  </div>  
)
}

export default Blog