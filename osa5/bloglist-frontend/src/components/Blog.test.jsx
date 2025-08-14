import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('url, likes and user shown', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Aaja',
    url: 'test.fi',
    likes: 0,
    user: {
      username: 'tester',
      name: 'tester'
    }
  }

  const mockHandler = vi.fn()


  render(<Blog blog={blog} author={'Test Aaja'} url={'test.fi'} likes={'0'} user={{ username: 'tester', name: 'tester' }}
    setBlogsVisible={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  //const url = screen.getByText('test.fi')
  //const likes = screen.getByText('0')
  //const name = screen.getByText('tester')

  const url = screen.getByText('test.fi')
  const name = screen.getByText('tester')
  const likes = screen.getByText('likes: 0')

  expect(likes).toBeDefined()
  expect(url).toBeDefined()
  expect(name).toBeDefined()
})
