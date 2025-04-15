const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
  ]

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('apitest blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('apitest there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 2)
})

test('apitest id is in correct format', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    
    assert.ok(firstBlog.id)
    assert.strictEqual(firstBlog._id, undefined)
})

test('apitest blog is added', async () => {
    const initial = await api.get('/api/blogs')
    const initialAmount = initial.body.length

    const testBlog = {
        title: "test test",
        author: "testaaja",
        url: "www.test.com",
        likes: 3
      }
    
    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)

    const after = await api.get('/api/blogs')
    const afterAmount = after.body.length

    const titleAfter = after.body[afterAmount-1].title
    const authorAfter = after.body[afterAmount-1].author
    const urlAfter = after.body[afterAmount-1].url
    const likesAfter = after.body[afterAmount-1].likes

    assert.strictEqual(afterAmount, initialAmount+1)
    assert.strictEqual(titleAfter, "test test")
    assert.strictEqual(authorAfter, "testaaja")
    assert.strictEqual(urlAfter, "www.test.com")
    assert.strictEqual(likesAfter, 3)
    
})

test('apitest undefined likes returns 0', async () => {

    const testBlog = {
        title: "test test",
        author: "testaaja",
        url: "www.test.com",
      }

    const response = await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
    
    assert.strictEqual(response.body.likes, 0)
})

test('apitest no title or no url returns 400', async () => {

    const testBlogOne = {
        title: "test test",
        author: "testaaja",
        likes: 3
      }

    const testBlogTwo = {
        author: "testaaja",
        url: "www.test.com",
        likes: 3
    }

    await api
      .post('/api/blogs')
      .send(testBlogOne)
      .expect(400)
    
    await api
      .post('/api/blogs')
      .send(testBlogTwo)
      .expect(400)
})

test('apitest delete blog', async () => {
    const initial = await api.get('/api/blogs')
    const initialAmount = initial.body.length

    await api.delete(`/api/blogs/${initial.body[0].id}`).expect(204)

    const after = await api.get('/api/blogs')
    const afterAmount = after.body.length

    assert.strictEqual(initialAmount-1, afterAmount)
})

test('apitest update blog', async () => {
    const response = await api.get('/api/blogs')
    const blogEdit = response.body[0]

    const editedTitle = {
        title: "edited",
        author: blogEdit.author,
        url: blogEdit.url,
        likes: blogEdit.likes
    }

    const editedAuthor = {
        title: blogEdit.title,
        author: "edited",
        url: blogEdit.url,
        likes: blogEdit.likes
    }

    const editedUrl = {
        title: blogEdit.title,
        author: blogEdit.author,
        url: "www.edited.com",
        likes: blogEdit.likes
    }

    const editedLikes = {
        title: blogEdit.title,
        author: blogEdit.author,
        url: blogEdit.url,
        likes: 30000
    }

    const newTitle = await api
        .put(`/api/blogs/${blogEdit.id}`)
        .send(editedTitle)
        .expect(200)

    const newAuthor = await api
        .put(`/api/blogs/${blogEdit.id}`)
        .send(editedAuthor)
        .expect(200)

    const newUrl = await api
        .put(`/api/blogs/${blogEdit.id}`)
        .send(editedUrl)
        .expect(200)

    const newLikes = await api
        .put(`/api/blogs/${blogEdit.id}`)
        .send(editedLikes)
        .expect(200)

    assert.strictEqual(newTitle.body.title, editedTitle.title)
    assert.strictEqual(newAuthor.body.author, editedAuthor.author)
    assert.strictEqual(newUrl.body.url, editedUrl.url)
    assert.strictEqual(newLikes.body.likes, editedLikes.likes)
})


after(async () => {
  await mongoose.connection.close()
})