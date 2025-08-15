const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')
const assert = require('assert')

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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Testaaja',
        username: 'testinen',
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

    await page.getByRole('button', { name: 'view' }).last().click()
    await expect(page.getByTestId('likes')).toContainText('likes: 0')
    await page.getByRole('button', { name: 'like' }).last().click()
    await expect(page.getByTestId('likes')).toContainText('likes: 1')
  })



test('a new blog can be deleted', async ({ page }) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill('otsikko')
    await page.getByTestId('author').fill('kirjailija')
    await page.getByTestId('url').fill('url-osoite')
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'view' }).last().click()

    page.on('dialog', async dialog => {
    assert(dialog.type() === 'confirm')
    await dialog.accept()
    })

    await page.getByRole('button', { name: 'remove' }).last().click()

    await expect(page.getByText('otsikko kirjailija')).toHaveCount(0)
    
  })




test('remove button only visible to user who added blog', async ({ page }) => {
    
  //tämä testaa, että kirjautunut käyttäjä voi poistaa blogin, eli
  // remove-nappi näkyy hänelle
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill('otsikko')
    await page.getByTestId('author').fill('kirjailija')
    await page.getByTestId('url').fill('url-osoite')
    await page.getByRole('button', { name: 'create' }).click()
  await page.getByRole('button', { name: 'view' }).last().click()

    page.on('dialog', async dialog => {
    assert(dialog.type() === 'confirm')
    await dialog.accept()
    })

    await page.getByRole('button', { name: 'remove' }).last().click()

    await expect(page.getByText('otsikko kirjailija')).toHaveCount(0)

  //lisätään uusi testiä varten
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill('otsikko2')
    await page.getByTestId('author').fill('kirjailija2')
    await page.getByTestId('url').fill('url-osoite2')
    await page.getByRole('button', { name: 'create' }).click()

  // kirjataan aiempi käyttäjä ulos ja luodaan uusi,
  // jolla kirjaudutaan sisään
    await page.getByRole('button', { name: 'logout' }).click()

    
    await page.goto('http://localhost:5173')
    await page.getByTestId('username').fill('testinen')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
    
    await expect(page.getByText('Testaaja logged in')).toBeVisible()

    //avataan "view" ja oletetaan, että remove nappia ei näy
    await page.getByRole('button', { name: 'view' }).click()

    await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0)
  
  })

  test('blogs are in order by likes', async ({ page }) => {
    // lisätään kolme blogia
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill('otsikko1')
    await page.getByTestId('author').fill('kirjailija1')
    await page.getByTestId('url').fill('url-osoite1')
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill('otsikko2')
    await page.getByTestId('author').fill('kirjailija2')
    await page.getByTestId('url').fill('url-osoite2')
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill('otsikko3')
    await page.getByTestId('author').fill('kirjailija3')
    await page.getByTestId('url').fill('url-osoite3')
    await page.getByRole('button', { name: 'create' }).click()

    const blog3 = page.getByTestId('title_blogi').filter({ hasText: 'otsikko3 kirjailija3' })
    const blog1 = page.getByTestId('title_blogi').filter({ hasText: 'otsikko1 kirjailija1' })

    //liketään blg3 viisi kertaa ja blog1 kaksi kertaa
    await blog3.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByRole('button', { name: 'hide' }).click()
    
    await blog1.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByRole('button', { name: 'hide' }).click()

    await page.reload()
    await expect(page.getByText('otsikko1 kirjailija1')).toBeVisible()
    await expect(page.getByText('otsikko2 kirjailija2')).toBeVisible()
    await expect(page.getByText('otsikko3 kirjailija3')).toBeVisible()

    const blogs = page.getByTestId('title_blogi')
    
    await expect(blogs.first()).toContainText('otsikko3 kirjailija3')
    await expect(blogs.nth(1)).toContainText('otsikko1 kirjailija1')
    await expect(blogs.last()).toContainText('otsikko2 kirjailija2')
  })

})
})