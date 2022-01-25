import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                            dispatch(addVote(anecdote.id))
                            dispatch(setNotification(`you voted "${anecdote.content}"`))
                            setTimeout(() => {dispatch(removeNotification())}, 5000)
                        }
                    }
                />
            )}
        </div>
    )
}

export default AnecdoteList