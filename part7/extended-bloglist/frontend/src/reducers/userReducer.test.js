import userReducer from "./userReducer";
import deepFreeze from 'deep-freeze';

describe('userReducer', () => {
    test('returns new state with action SET_USER', () => {
        const state = null
        const action = {
            type: 'SET_USER',
            data: {
                username: 'user',
                password: 'pass'
            }
        }

        const newState = userReducer(state, action)
        expect(newState).toEqual(action.data)
    })

    test('returns null state with action REMOVE_USER', () => {
        const state = {
            username: 'user',
            password: 'pass'
        }
        const action = {
            type: 'REMOVE_USER',
        }

        deepFreeze(state)

        const newState = userReducer(state, action)
        expect(newState).toBe(null)
    })
})