import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import VendorScreen from './screens/VendorScreen'
import AddVendorScreen from './screens/AddVendor'
import VendorEdit from './screens/EditVendor'
import AddVendorListing from './screens/AddListing'
import ListingsScreen from './screens/ListingsScreen'
import ListingEdit from './screens/EditListing'
import HomePage from './screens/HomePage'
import ListingScreen from './screens/ListingScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          {/* <Route path='/search/:keyword' component={HomeScreen} exact /> */}
          {/* <Route path='/page/:pageNumber' component={HomeScreen} exact /> */}
          <Route path='/dashboard' component={VendorScreen} exact />
          <Route path='/' component={HomePage} exact />
          <Route path='/vendor/:id' component={ListingScreen} exact />

          <Route path='/vendors/addvendor' component={AddVendorScreen} exact />
          <Route path='/vendors/edit/:id' component={VendorEdit} exact />
          <Route path='/listings/:id' component={AddVendorListing} exact />
          <Route path='/vendorlistings/:id' component={ListingsScreen} exact />
          <Route path='/listings/edit/:id' component={ListingEdit} exact />


          {/* <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact */}
          {/* /> */}
          {/* <Route path='/' component={HomeScreen} exact /> */}
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
