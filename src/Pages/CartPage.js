import Layout from "../Layout/Layout";
import { useCart } from "../Providers/CartProvider";
import { useCartActions } from "../Providers/CartProvider";
import { Link } from "react-router-dom";
import "./CartPage.css";

const CartPage = (cartItem) => {
  const cartState = useCart();
  const dispatch = useCartActions();
  const { cart, total } = cartState;
  if (!cart.length)
    return (
      <Layout>
        <main>
          <h2>Cart is Empty!</h2>
        </main>
      </Layout>
    );
  const incHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };

  const decHandler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };
  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => {
              return (
                <div className="cartItem">
                  <div className="itemImage">
                    <img src={item.image} alt="item.name" />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.offPrice * item.quantity}</div>
                  <div className="btnGroup">
                    <button onClick={() => decHandler(item)}>-</button>
                    <button>{item.quantity}</button>
                    <button onClick={() => incHandler(item)}>+</button>
                  </div>
                </div>
              );
            })}
          </section>
          <CartSummary cart={cart} total={total} />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummary = ({ total, cart }) => {
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;
  return (
    <section className="cartSummary">
      <h2 style={{ marginBottom: "30px" }}>Cart Summary</h2>
      <div className="summaryItem">
        <p>OriginalTotalPrice :</p>
        <p>{originalTotalPrice}$</p>
      </div>
      <div className="summaryItem">
        <p>Cart Discount :</p>
        <p>{originalTotalPrice - total}</p>
      </div>
      <div className="summaryItem net">
        <p>Final Price :</p>
        <p>{total}$</p>
      </div>
      <Link to="/signup?redirect=checkout" >
        <button className="btn checkbtn">Go to Checkout</button>
      </Link>
    </section>
  );
};



