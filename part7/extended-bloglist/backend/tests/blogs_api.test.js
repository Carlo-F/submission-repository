const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blogs = require('../models/blogs')
const initialBlogs = [
    {
        "_id": '61bb12c0438f82e0044c96ca',
        "title": "The first Blog",
        "author": "IT's ME!",
        "user": "61c357fc853e884af9008a5b"
    },
    {
        "title": "The second Blog",
        "author": "IT's still ME!",
        "user": "61c357fc853e884af9008a5b"
    }
]

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impva2VyIiwiaWQiOiI2MWMzNTdmYzg1M2U4ODRhZjkwMDhhNWIiLCJpYXQiOjE2NDAyNjU4MTB9.oMbaKhceBAc1BiYIFtvSYMNaEV1ZaUlvJbJMYvnyjPo"

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
        "url": "http://localhost",
        "user": "61c357fc853e884af9008a5b"
    }

    await api
        .post('/api/blogs')
        .set({ Authorization: `bearer ${token}` })
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
        "url": "http://localhost",
        "user": "61c357fc853e884af9008a5b"
    }

    await api
        .post('/api/blogs')
        .set({ Authorization: `bearer ${token}` })
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
        "user": "61c357fc853e884af9008a5b"
    }

    await api
        .post('/api/blogs')
        .set({ Authorization: `bearer ${token}` })
        .send(newBlog)
        .expect(400)
})

test('deleting a blog', async () => {
    const id = '61bb12c0438f82e0044c96ca'

    await api
        .delete(`/api/blogs/${id}`)
        .set({ Authorization: `bearer ${token}` })
        .expect(204)
    
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length-1)
    
}, 10000)

test('401 unauthorized is returned if a token is not provided', async () => {
    const newBlog = {
        "author": "Mario D.",
        "likes": 43,
        "user": "61c357fc853e884af9008a5b"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})