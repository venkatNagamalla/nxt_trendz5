import CartContext from '../../context/CartContext'
import './index.css'
// Write your code here

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalPrice = 0
      cartList.forEach(eachProduct => {
        totalPrice += eachProduct.price * eachProduct.quantity
      })
      return (
        <div className="total-price-container">
          <div className="total-price-inner-container">
            <h1 className="total-price">
              <span className="total-heading">Order Total: </span>
              Rs {totalPrice}/-
            </h1>
            <p className="no-of-items">{cartList.length} items in cart</p>
          </div>
          <button className="mobile-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
