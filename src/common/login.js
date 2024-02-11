import React, { useState } from 'react';
import Logo from './airbnb.svg';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    // console.log("API URL:", apiUrl);

    try {
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        // console.log('Login successful:', data);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('email', data.email);
        localStorage.setItem('isAdmin', data.isAdmin);
        localStorage.setItem('name', data.name);
        Navigate('/home');
      } else {
        console.error('Login failed');
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error during login. Please try again.');
    }
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary fixed-top" style={{ backgroundColor: '#e3f2fd' }}>
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={Logo} alt="Airbnb Logo" style={{ height: '30px', width: 'auto' }} />
          </a>
          <h4><Link to='/Signup'>Signup</Link></h4>
        </div>
      </nav>
      <div className="custom-width" style={{ width: '50%', marginLeft: '25%', marginTop: '8%' }}>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder='Enter your email address'
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  placeholder='Enter your password'
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <p className="mt-1">
              Don't have Account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
