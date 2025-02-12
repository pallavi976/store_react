import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import './app.css';
import Nonveg from "./Nonveg";
import Veg from "./Veg";
import Cart from "./Cart";
import Orders from "./Orders";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import { useDispatch, useSelector } from "react-redux";
import Dairy from "./Dairy";
import { logout } from "./store";
import Login from "./Login";

function App() {
  const cart = useSelector(state => state.cart);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const dispatch = useDispatch();
  const purchaseHistory=useSelector(state=>state.purchaseHistory);
  
  

  return (
    <>
      <BrowserRouter>
        <nav className="navbar">
          <Link to='/home' className="linkstyle">Home</Link>
          <Link to='/veg' className="linkstyle">Veg</Link>
          <Link to='/nonveg' className="linkstyle">Nonveg</Link>
          <Link to='/dairy' className="linkstyle">Dairy</Link>
          <Link to='/cart' className="linkstyle">Cart<span>{totalItems}</span></Link>
          <Link to='/orders' className="linkstyle">Orders</Link>
          {
            isAuthenticated ? (
              <>
                <span className="welcome">Welcome, {user}</span>
                <button onClick={() => dispatch(logout())} className="logout-button">Logout</button>
              </>
            ) : (
              <Link to='/login' className="myclass">SignIn</Link>
            )
          }
        </nav>

        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='veg' element={<Veg />} />
          <Route path='nonveg' element={<Nonveg />} />
          <Route path='dairy' element={<Dairy />} />
          <Route path='cart' element={<Cart />} />
          <Route path='orders' element={<Orders />} />
          <Route path='aboutUs' element={<AboutUs />} />
          <Route path='contactUs' element={<ContactUs />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
