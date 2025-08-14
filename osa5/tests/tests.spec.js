const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
      await expect(page.getByTestId('username')).toBeVisible()
      await expect(page.getByTestId('password')).toBeVisible()
      await page.getByRole('button', { name: 'login' }).click()
})

test('Login works', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
})

test('Login fails with incorrect credentials', async ({ page }) => {
      await page.getByTestId('username').fill('moi')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
})

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill('otsikko')
    await page.getByTestId('author').fill('kirjailija')
    await page.getByTestId('url').fill('url-osoite')
    await page.getByRole('button', { name: 'create' }).click()

    await expect(page.getByText('a new blog otsikko by kirjailija added')).toBeVisible()

    await expect(page.getByTestId('title_blogi').last()).toContainText('otsikko kirjailija')

  })

test('a new blog can be liked', async ({ page }) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill('otsikko')
    await page.getByTestId('author').fill('kirjailija')
    await page.getByTestId('url').fill('url-osoite')
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByTestId('likes')).toContainText('likes: 0')
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByTestId('likes')).toContainText('likes: 1')
  })

})

})