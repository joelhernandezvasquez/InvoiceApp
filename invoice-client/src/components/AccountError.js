import React from 'react';
import {Link} from 'react-router-dom';
import logoIcon from '../assets/images/logo.svg';

const AccountError = () => {
    return (
        <div className="error-account-page">
            <div className="container">
              <img className="logo" src={logoIcon} alt ="logo invoicely"/>
              <h1>No Account Found</h1>
              <p className="leading-text text-center">We've searched our records but can't find an account that matches with the credentials provided</p>
              <p  className="leading-text text-center">Do you want to create a new Account with this email?</p>
              <a href="/auth/google/register" className=" btn btn-primary">Yes, Create a new account</a>
              <Link to="/login" id="link">Return to Sign in</Link>
        </div>
        </div>
    )
}

export default AccountError;
