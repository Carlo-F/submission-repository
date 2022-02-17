import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm />', () => {
  test('submit addFormBlog', () => {
    const createBlog = jest.fn()

    const component = render(
      <AddBlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('input[name="Title"]')
    const authorInput = component.container.querySelector('input[name="Author"]')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'title input Test' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'author input Test' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title input Test')
    expect(createBlog.mock.calls[0][0].author).toBe('author input Test')
  })
})