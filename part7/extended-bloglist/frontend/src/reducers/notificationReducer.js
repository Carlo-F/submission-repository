const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case ('SET_NOTIFICATION'):
            return action.message;
        case ('REMOVE_NOTIFICATION'):
            return null;
        default:
            return state;
    }
}

export const createMessage = (message) => {
    return {
        type: 'SET_NOTIFICATION',
        message: message
    }
}

export const removeMessage = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export default notificationReducer