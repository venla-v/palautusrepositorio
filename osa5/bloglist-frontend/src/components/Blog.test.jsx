import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
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

test('like button clicked twice', async () => {
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
  const mockHandlerLikes = vi.fn()


  render(<Blog blog={blog} author={'Test Aaja'} url={'test.fi'} likes={'0'} user={{ username: 'tester', name: 'tester' }}
    setBlogsVisible={mockHandler} handleLikeChange={mockHandlerLikes}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const button2 = screen.getByText('like')

  await user.click(button2)
  await user.click(button2)

  //const url = screen.getByText('test.fi')
  //const likes = screen.getByText('0')
  //const name = screen.getByText('tester')

  expect(mockHandlerLikes.mock.calls).toHaveLength(2)
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
  const mockHandlerBlog = vi.fn()


  render(<BlogForm blog={blog} author={'Test Aaja'} url={'test.fi'} likes={'0'} user={{ username: 'tester', name: 'tester' }}
    setBlogsVisible={mockHandler} createBlog={mockHandlerBlog} deleteBlog={() => {}}/>
  )

  const user = userEvent.setup()

  const testTitle = screen.getByPlaceholderText('title')
  const testAuthor = screen.getByPlaceholderText('author')
  const testUrl = screen.getByPlaceholderText('url')

  await user.type(testTitle, 'Testiblogi' )
  await user.type(testAuthor, 'Testaaja' )
  await user.type(testUrl, 'testaus.fi' )

  const button2 = screen.getByText('create')
  await user.click(button2)

  expect(mockHandlerBlog.mock.calls).toHaveLength(1)
  expect(mockHandlerBlog.mock.calls[0][0].title).toBe('Testiblogi')
  expect(mockHandlerBlog.mock.calls[0][0].author).toBe('Testaaja')
  expect(mockHandlerBlog.mock.calls[0][0].url).toBe('testaus.fi')
})