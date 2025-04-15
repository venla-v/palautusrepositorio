const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
      response.json(blogs)
    })
  })

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
  
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })
  
    const saved = await blog.save()
    response.status(201).json(saved)
  } catch (error) {
    next(error)
  }
  })
  
  blogsRouter.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)
  
    await blog.save()
    response.status(201).json(result)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

  module.exports = blogsRouter