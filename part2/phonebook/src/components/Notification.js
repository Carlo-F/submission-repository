import React from 'react'

const Notification = ({ status, message }) => {
    const successStyle = {
        color: 'green',
        borderStyle: 'solid',
        borderColor: 'green',
        fontSize: 20,
        padding: 10,
        marginBottom: 10,
    }

    const errorStyle = {
        color: 'red',
        borderStyle: 'solid',
        borderColor: 'red',
        fontSize: 20,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null) {
        return null
    }

    return (
        <div style={status === 'success' ? successStyle : errorStyle}>
            {message}
        </div>
    )
}

export default Notification