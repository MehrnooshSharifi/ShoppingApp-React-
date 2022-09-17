import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import CartProvider from "./Providers/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutPage from "./Pages/CkeckoutPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import AuthProvider from "./Providers/AuthProvider";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastContainer />
        <Switch>
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
