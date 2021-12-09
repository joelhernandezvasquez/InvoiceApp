import {Link } from 'react-router-dom';
import logoIcon from '../assets/images/logo.svg';

const ExistingAccoutError = () => {
    return (
        <div className="error-account-page">
            <div className="container">
              <img className="logo" src={logoIcon} alt ="logo invoicely"/>
              <h1>Account Found</h1>
              <p className="leading-text text-center">It looks like that you already have an account with us.</p>
              <p  className="leading-text text-center">Do you want to Sign in with this email?</p>
              <a href="/auth/google" className=" btn btn-primary">Yes, Sign me in</a>
              <Link to="/signup" id="link">Return to Sign up</Link>
        </div>
        </div>
    )
}

export default ExistingAccoutError;
