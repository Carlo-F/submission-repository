const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.data
        case 'APPEND_BLOG':
            return [...state,action.data]
        case 'NEW_BLOG':
            return state.concat(action.data);
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)

        default:
            return state
    }
}

export const setBlogs = (blogs) => {
    return {
        type: 'SET_BLOGS',
        data: blogs
    }
}

export const appendBlog = (blog) => {
    return {
        type: 'APPEND_BLOG',
        data: blog
    }
}

export const createBlog = (blog) => {
    return {
        type: 'NEW_BLOG',
        data: blog
    }
}

export const deleteBlog = (id) => {
    return {
        type: 'DELETE_BLOG',
        data: {
            id: id
        }
    }
}

export default blogReducer