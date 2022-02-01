
const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':          
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return ''
    default:
        return state
    }

}

export const setNotification = (notification,seconds) => {
    return async dispatch => {
        const duration = seconds*1000
        dispatch({
        type: 'SET_NOTIFICATION',
        notification: notification,
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, duration)
    }
}

export default notificationReducer