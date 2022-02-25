const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.data;
        case 'APPEND_BLOG':
            return [...state, action.data];
        case 'NEW_BLOG':
            return state.concat(action.data);
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.data.id);
        case 'LIKE_BLOG':
            return state.map(blog => blog.id === action.data.id ? { ...blog, likes: blog.likes + 1 } : blog)
        case 'COMMENT_BLOG':
            return state.map(blog => blog.id === action.data.id
                ? { ...blog, comments: blog.comments.concat(action.data.comment) } 
                : blog
            )
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

export const likeBlog = (id) => {
    return {
        type: 'LIKE_BLOG',
        data: {
            id: id
        }
    }
}

export const commentBlog = (blogId, comment) => {
    return {
        type: 'COMMENT_BLOG',
        data: {
            id: blogId,
            comment: comment
        }
    }
}

export default blogReducer