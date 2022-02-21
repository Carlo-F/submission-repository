const userReducer = (state = null, action) => {
    switch (action.type) {
        case ('SET_USER'):
            return action.data;
        case ('REMOVE_USER'):
            return null;
        default:
            return state;
    }
}

export const logInUser = (user) => {
    return {
        type: 'SET_USER',
        data: user
    }
}

export const logOutUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}

export default userReducer