const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0

    blogs.map(blog => total += blog.likes)
    
    return total
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))

    const result = blogs.find(({ likes }) => likes === mostLikes)

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}