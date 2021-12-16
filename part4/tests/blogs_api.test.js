const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blogs = require('../models/blogs')
const initialBlogs = [
    {
        "title": "The first Blog",
        "author": "IT's ME!"
    },
    {
        "title": "The second Blog",
        "author": "IT's still ME!"
    }
]

beforeEach(async () => {
    await Blogs.deleteMany({})
    let blogObject = new Blogs(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blogs(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned in JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs unique identifier is id', async () => {
    const response = await api.get('/api/blogs')

    for (let blog of response.body) {
        expect(blog.id).toBeDefined()
    }
})

test('a new blog is created successfully', async () => {
    const newBlog = {
        "title": "A new fresh blog",
        "author": "Mario",
        "url": "http://localhost"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    
}, 10000)

test('missing likes property is set to zero', async () => {
    const newBlog = {
        "title": "A new fresh blog",
        "author": "Mario",
        "url": "http://localhost"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    expect(response.body[initialBlogs.length].likes).toBe(0)
    
}, 10000)

test('400 bad request is returned if title and url properties are missing', async () => {
    const newBlog = {
        "author": "Mario D.",
        "likes": 43,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})