import blogReducer from "./blogReducer";
import deepFreeze from "deep-freeze";

describe('blogReducer', () => {
    test('return new state with action APPEND_BLOG', () => {
        const initialState = [
            { title: 'blog', id: 1 }
        ]
        const action = {
            type: 'APPEND_BLOG',
            data: {
                title: 'a new blog',
                author: 'Arthur Fleck',
                url: ''
            }
        }

        deepFreeze(initialState)
        const newState = blogReducer(initialState, action)
        expect(newState).toHaveLength(2)
    })

    test('returns new state with action NEW_BLOG', () => {
        const state = []
        const action = {
            type: 'NEW_BLOG',
            data: {
                title: 'a new blog',
                author: 'Arthur Fleck',
                url: ''
            }
        }

        deepFreeze(state)
        const newState = blogReducer(state, action)
        
        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })

    test('delete blog with action DELETE_BLOG', () => {
        const initialState = [
            { title: 'blog', id: 1 },
            { title: 'second blog', id: 2 }
        ]
        const action = {
            type: 'DELETE_BLOG',
            data: {
                id: 1
            }
        }

        deepFreeze(initialState)
        const newState = blogReducer(initialState, action)
        expect(newState).toHaveLength(1)
    })
})