import { BrowserRouter, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Homepage from './screens/Homepage'
import Category from './screens/Category'
import ProductScreen from './screens/ProductScreen'
import SigninScreen from './screens/SigninScreen'
import CartScreen from './screens/CartScreen'
import { signout } from './actions/userActions'

//Routes
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import SellerRoute from './components/SellerRoute'

// No css yet
import RegisterScreen from './screens/RegisterScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import AboutScreen from './screens/AboutScreen'

function App() {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">SHOPTRONICS</Link>
          </div>
          <div className="signin-cart-component">
            {userInfo ? (
              <div className="sign-in-dropdown">
                <Link to="/profile">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="sign-in-dropdown-content">
                  <li>
                    <Link to="/profile">
                      User Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">
                      Order History
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign in</Link>
            )} 
            {userInfo && userInfo.isSeller && (
              <div className="sign-in-dropdown">
                <Link to="$admin">
                  Seller <i className="fa fa-caret-down"></i>
                  <ul className="sign-in-dropdown-content">
                    <li>
                      <Link to="/productlist/seller">Product</Link>
                    </li>
                    <li>
                      <Link to="/orderlist/seller">Orders</Link>
                    </li>
                  </ul>
                </Link>
              </div>
            )} 
            {userInfo && userInfo.isAdmin && (
              <div className="sign-in-dropdown">
                <Link to="/productlist">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="sign-in-dropdown-content">
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
            <Link to="/cart">
              Cart
              {
                cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )
              }  
            </Link>
          </div>
        </header>
        
        <navbar>
          <div className="dropdown">
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/playstation">PlayStation</Link></li>
                <li><Link to="index.html">Xbox</Link></li>
                <li><Link to="index.html">Nintendo Switch</Link></li>
                <li><Link to="index.html">Accessories</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </nav>
          </div>
        </navbar>

        <main>
          <Route path="/signin" component={SigninScreen} ></Route>
          <Route path="/register" component={RegisterScreen} ></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen} ></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/about" component={AboutScreen}></Route>

          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>

          <AdminRoute path="/productlist" component={ProductListScreen}exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>

          <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>

          <Route path="/collection/:id" component={ProductScreen}exact></Route>
          <Route path="/collection/:id/edit" component={ProductEditScreen}exact></Route>
          <Route path="/cart/:id?" component={CartScreen} ></Route>
          <Route path="/playstation" component={Category}></Route>
          <Route path="/" component={Homepage}exact ></Route>
        </main>

        <footer className="row center">

          All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App;
