// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(each => {
        total += each.price * each.quantity
      })
      console.log(total)

      return (
        <div>
          <h1>
            Order Total:<span>{total}/-</span>
            <p>{cartList.length} items in cart</p>
          </h1>
          <button type="button">checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
