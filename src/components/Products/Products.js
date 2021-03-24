import React, { useState } from 'react'
import Product from '../Product/Product'
import api from '../../utils/api'
import isLocalHost from '../../utils/isLocalHost'

const Products = ({ products, cart }) => {
    const [currentProduct, setCurrentProduct] = useState([]);

    if (!products || !products.length) {
        // Loading State here
        return null
    }

    const displayProduct = id => {

      api.readOne(id).then((product) => {
        if (product.message === 'unauthorized') {
          if (isLocalHost()) {
            alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info')
          } else {
            alert('FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct')
          }
          return false
        }
  
        console.log('one product', product)
        return setCurrentProduct([product]);
      })
    }

    console.log('currentProduct:', currentProduct);

    const productsList = products.map((product, i) => {
        const { data, ref } = product
        const id = ref['@ref'].id;
        return (
            <div key={i} className='todo-item'>
                <label className="todo">
                    <div className='todo-list-title'>
                        {data.title}
                    </div>
                    <button type='button' onClick={e => displayProduct(id)}>View</button>
                </label>
            </div>
        )
    })
    return (
        <>
            { productsList}
            { currentProduct.length > 0 ? <Product product={currentProduct} cart={cart} /> : null }
        </>
    )
}

export default Products;