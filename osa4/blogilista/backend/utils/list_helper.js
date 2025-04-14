const _ = require('lodash')


const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
  }

const favoriteBlog = (blogs) => {

  if (blogs.length === 1){
    return blogs[0]
  }
  else {
  let favoriteBlog = blogs[0]

  for (let i = 1; i < blogs.length; i++){
    if (favoriteBlog.likes < blogs[i].likes)
      favoriteBlog = blogs[i]
  }
  return favoriteBlog
}

}

const mostBlogs = (blogs) => {
  let mostBlogs = { author: '', blogs: 0 }

  if (blogs.length === 1){
    mostBlogs = { author: blogs[0].author, blogs: 1 }
    return mostBlogs
  }

  const totalAmount = _.countBy(blogs, 'author')

  for (const author in totalAmount){
    if (totalAmount[author] > mostBlogs.blogs) {
      mostBlogs = { author: author, blogs : totalAmount[author]}
    }
  }
  return mostBlogs
}

  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}