/* Api methods to call /functions */

const create = (data) => {
  return fetch('/.netlify/functions/todos-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const createCart = (data) => {
  return fetch('/.netlify/functions/cart-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}


const readAll = () => {
  return fetch('/.netlify/functions/products-read-all').then((response) => {
    return response.json()
  })
}

const readOne = (todoId) => {
  return fetch(`/.netlify/functions/products-read/${todoId}`).then((response) => {
    return response.json()
  })
}

const readCart = (cartId) => {
  return fetch(`/.netlify/functions/cart-read/${cartId}`).then((response) => {
    return response.json()
  })
}

const update = (cartId, data) => {
  return fetch(`/.netlify/functions/todos-update/${cartId}`, {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const deleteTodo = (todoId) => {
  return fetch(`/.netlify/functions/todos-delete/${todoId}`, {
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

const batchDeleteTodo = (todoIds) => {
  return fetch(`/.netlify/functions/todos-delete-batch`, {
    body: JSON.stringify({
      ids: todoIds
    }),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export default {
  create: create,
  readAll: readAll,
  readOne: readOne,
  update: update,
  delete: deleteTodo,
  batchDelete: batchDeleteTodo,
  readCart: readCart,
  createCart: createCart
}
