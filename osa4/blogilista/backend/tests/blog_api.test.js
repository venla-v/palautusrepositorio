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
        .expect(200)

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
      .expect(200)
    
    assert.strictEqual(response.body.likes, 0)
})


after(async () => {
  await mongoose.connection.close()
})