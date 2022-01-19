import reducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
    test('add vote to single anecdote', () => {
        const state = [
            {
                "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
                "id": "93465",
                "votes": 0
            }
        ]

        const action = {
            type: 'ADD_VOTE',
            data: {
                id: "93465"
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)
        const votedAnecdote = newState.filter(anecdote => anecdote.id === action.data.id)
        
        expect(votedAnecdote).toContainEqual({
            "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
            "id": "93465",
            "votes": 1
        })
    })

    test('create new anecdote', () => {
        const state = [

        ]

        const action = {
            type: 'NEW_ANECDOTE',
            data: {
                content: "A fresh new anecdote",
                id: "0001",
                votes: 0
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)
        
        expect(newState).toHaveLength(1)
    })
})