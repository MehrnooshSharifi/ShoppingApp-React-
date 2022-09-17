import { useAth } from "../../Providers/AuthProvider";
import { useCart } from "../../Providers/CartProvider";
import { Link } from "react-router-dom";

const Checkout = () => {
  const auth = useAth();
  const { cart, total } = useCart();
  if (!cart.length)
    return (
      <main className="container">
        <Link to="/">Go to Shopping</Link>
      </main>
    );
  return (
    <main className="container">
      <section className="cartCenter">
        {auth ? (
          <>
            <section className="cartItemList">
              <h3>Checkout Detail</h3>
              <p>name :{auth.name} </p>
              <p>email :{auth.email} </p>
              <p>phoneNumber :{auth.phoneNumber} </p>
            </section>
            <section className="cartSummary">
              {cart &&
                cart.map((c) => {
                  return (
                    <div>
                      {c.name} * {c.quantity}: {c.quantity * c.offPrice}
                    </div>
                  );
                })}
              <hr />
              <div>TotalPrice : {total}</div>
            </section>
          </>
        ) : (
          <p>Please Login!</p>
        )}
      </section>
    </main>
  );
};

export default Checkout;
