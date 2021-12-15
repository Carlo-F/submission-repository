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
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length+1)
    
}, 10000)

afterAll(() => {
    mongoose.connection.close()
})