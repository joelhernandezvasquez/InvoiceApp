import React from 'react'
import Home from './Home'
import Login from './Login'
import AccountError from './AccountError'
import SignUp from './SignUp'
import history from '../history'
import { Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import ExistingAccoutError from './ExistingAccoutError'
import UserProfile from './User/UserProfile'
import UserAccount from './User/UserAccount'
import Invoices from './Invoice/Invoices'
import CreateInvoice from './Invoice/CreateInvoice'
import Customer from './Customers/Customer'
import ViewCustomer from './Customers/ViewCustomer';
import CreateCustomer from './Customers/CreateCustomer'
import EditCustomer from './Customers/EditCustomer'
import '../sass/main.scss'


const App = () => {
  return (
    <>
      <Router history={history}>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route
          path='/no-account-found/google-oauth2'
          exact
          component={AccountError}
        />
        <Route
          path='/account-found/google-oauth2'
          exact
          component={ExistingAccoutError}
        />
        <Route path='/profile' exact component={UserProfile} />
        <Route path='/account' exact component={UserAccount} />
        <Route path='/invoice' exact component = {Invoices} />
        <Route path ='/add/invoice' exact component={CreateInvoice}/>
        <Route path = '/customer' exact component = {Customer}/>
        <Route path='/customer/:id' exact component = {ViewCustomer}/>
        <Route path='/add/customer' exact component={CreateCustomer}/>
        <Route path = '/edit/customer/:id' exact component = {EditCustomer}/>
      </Router>
    </>
  )
}

export default App
