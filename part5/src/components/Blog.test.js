/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    user: {
      id: '1bg43',
      username: 'joker',
    },
    author: 'Fred',
    title: 'First blog',
    url: '',
    likes: 0
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} username='joker' />
    )
  })


  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'First blog by Fred'
    )
  })

  test('at start the details are not displayed', () => {
    const ul = component.container.querySelector('.togglableContent')

    expect(ul).toHaveStyle('display: none')
  })
})