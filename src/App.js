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
    ct: 0,
  }

  componentDidMount() {
    const data = localStorage.getItem('list')
    if (data) {
      this.setState({cartList: JSON.parse(data)})
    }
  }

  componentDidUpdate() {
    const {cartList} = this.state
    localStorage.setItem('list', JSON.stringify(cartList))
    // this.setState({cartList: mount})
  }

  componentWillUnmount() {
    localStorage.removeItem('list')
    this.removeAllCartItems()
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (id === each.id) {
          const UpdatedQuantity = each.quantity + 1
          return {...each, quantity: UpdatedQuantity}
        }

        return each
      }),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (id === each.id) {
          const UpdatedQuantity = each.quantity - 1
          return {...each, quantity: UpdatedQuantity}
        }

        return each
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    // const {id} = cartList
    console.log(id)
    console.log(cartList)

    const a = cartList.filter(each => each.id !== id)
    // console.log(a)
    this.setState({cartList: a})
    // this.setState(prevState => ({cartList: [a]}))

    // const c = cartList.map(each => each.id).indexOf(id)
    // console.log(c)
    // const b = cartList.splice(a, 1)
    // console.log(b)
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList, ct} = this.state
    console.log(cartList)

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
