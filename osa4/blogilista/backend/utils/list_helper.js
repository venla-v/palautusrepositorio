const _ = require('lodash')


const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
  if (blogs.length === 0){
    return 0
  }
    const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
  }

const favoriteBlog = (blogs) => {
  if (blogs.length === 0){
    return null
  }
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

  if (blogs.length === 0){
    return mostBlogs
  }

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

const mostLikes = (blogs) => {
  let mostLikes = { author: '', likes: 0 }

  if (blogs.length === 1){
    mostLikes = { author: blogs[0].author, likes: blogs[0].likes }
    return mostLikes
  }

  const likesPerAuthor = _.reduce(blogs, (result, blog) => {
    if (result[blog.author]) {
      result[blog.author] += blog.likes
    } else {
      result[blog.author] = blog.likes
    }
    return result
  })

  for (const author in likesPerAuthor) {
    if (likesPerAuthor[author] > mostLikes.likes) {
      mostLikes = { author: author, likes: likesPerAuthor[author] }
    }
  }

  return mostLikes
}

  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}