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

  blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes }, { new: true}
      )
  
      if (updatedBlog) {
        response.json(updatedBlog)
      } else {
        response.status(404).end()
      }
    } catch (exception) {
      next(exception)
    }
  })

  module.exports = blogsRouter