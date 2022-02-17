const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Users = require('../models/users')
const initialUsers = [
    {
        "username": "mluukkai",
        "name": "Matt",
        "id": "61c1b094aa1040ba6edae283"
    },
    {
        "username": "ceffe",
        "name": "Carlo",
        "id": "61c1b0fba358b836acbee7c3"
    }
]

beforeEach(async () => {
    await Users.deleteMany({})
    let blogObject = new Users(initialUsers[0])
    await blogObject.save()
    blogObject = new Users(initialUsers[1])
    await blogObject.save()
})

test('Users are returned in JSON', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Invalid users are not created', async () => {
    const newUser = {
        username: 'Ca',
        name: 'Carlo',
        password: 'password'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})