import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const cartProduct = cartList.find(
      eachProduct => eachProduct.id === product.id,
    )
    if (cartProduct) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct => {
          if (eachProduct.id === cartProduct.id) {
            const updatedQuantity = eachProduct.quantity + product.quantity
            return {...eachProduct, quantity: updatedQuantity}
          }
          return eachProduct
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = productId => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachProduct => eachProduct.id !== productId,
    )
    this.setState({cartList: filteredCartList})
  }

  incrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct => {
        if (eachProduct.id === productId) {
          const updatedQuantity = eachProduct.quantity + 1
          return {...eachProduct, quantity: updatedQuantity}
        }
        return eachProduct
      }),
    }))
  }

  decrementCartItemQuantity = productId => {
    const {cartList} = this.state
    const product = cartList.find(eachProduct => eachProduct.id === productId)
    if (product.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct => {
          if (productId === eachProduct.id) {
            const updatedProductQuantity = eachProduct.quantity - 1
            return {...eachProduct, quantity: updatedProductQuantity}
          }
          return eachProduct
        }),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
