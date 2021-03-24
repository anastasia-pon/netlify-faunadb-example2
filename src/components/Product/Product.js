import React from 'react'

const Product = ({ product, cart }) => {
  updateCart = () => {

    cart.data.products.push(product.data.title);
    cart.data.total += product.data.price;
    // only set state if input different
    if (isDifferent) {
      this.setState({
        todos: updatedTodos
      }, () => {
        api.update(todoId, {
          title: currentValue
        }).then(() => {
          console.log(`update todo ${todoId}`, currentValue)
          analytics.track('todoUpdated', {
            category: 'todos',
            label: currentValue
          })
        }).catch((e) => {
          console.log('An API error occurred', e)
        })
      })
    }
  }
    return (
        <div className="product-info">
          <p className="product-title">{product[0].data.title}</p>
          <p className="product-description">{product[0].data.description}</p>
          <p className="product-price">{product[0].data.price}</p>
          <button type="button" onClick={() => updateCart()} disabled={!product[0].data.available}>Add to Cart</button>
        </div>
    );
}

export default Product;