/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = (event, context) => {
  console.log('Function `products-read-all` invoked')
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  }) 
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_products'))))
    .then((response) => {
      const productsRefs = response.data
      console.log('Product refs', productsRefs)
      console.log(`${productsRefs.length} products found`)
      // create new query out of product refs. http://bit.ly/2LG3MLg
      const getAllProductsDataQuery = productsRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllProductsDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
