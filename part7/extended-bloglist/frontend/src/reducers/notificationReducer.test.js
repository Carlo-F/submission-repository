import notificationReducer from "./notificationReducer";
import deepFreeze from 'deep-freeze';

describe('notificationReducer', () => {
    test('returns new state with action SET_NOTIFICATION', () => {
        const state = null
        const action = {
            type: 'SET_NOTIFICATION',
            message: 'the message'
        }

        const newState = notificationReducer(state, action)

        expect(newState).toBe('the message')
    })

    test('returns new state with action REMOVE_NOTIFICATION', () => {
        const state = 'a message'
        const action = {
            type: 'REMOVE_NOTIFICATION',
        }

        deepFreeze(state)
        const newState = notificationReducer(state, action)

        expect(newState).toBe(null)
    })
})