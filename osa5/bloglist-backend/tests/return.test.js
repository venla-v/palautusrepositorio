const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogsNone = {
  
}

test('dummy returns one', () => {

  const result = listHelper.dummy(blogsNone)
  assert.strictEqual(result, 1)
})

