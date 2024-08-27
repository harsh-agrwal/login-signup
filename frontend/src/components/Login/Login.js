import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import VisibilityOff from '../../images/visibility-off.svg';
import VisibilityOn from '../../images/visibility-on.svg';
import Google from '../../images/google-icon.svg';
import FaceBook from '../../images/facebook-svg.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:5000/auth/facebook';
  };

  return (
    <div className='wrapperForLogin'>
      <div className='containerForLoginForm'>
        <div className='headingText'>Login</div>
        <input className='loginInput' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='loginInput' type={isPasswordVisible ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <img className='eyeIconForLogin' alt='password Icon'
              src={isPasswordVisible ? VisibilityOff : VisibilityOn }
              title={isPasswordVisible ? 'Hide Password' : 'Show Password' }
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            </img>
        <div className='forgotPasswordText'>Forgot Password ?</div>
        <div className={`loginButton ${!email || !password ? 'disabledButton' : null }`} type="submit" onClick={(e) => email && password && handleSubmit()}>Login</div>
        <div className='signUpLinkText'>Don't have a account?
          <div className='forgotPasswordText' onClick={()=> window.location.assign('/signup')}> SignUp</div></div>
        <div style={{width: '80%'}}>
          <div className='signUpText'>Or</div>
          <div className='signupContainer'></div>
        </div>
          <div className='signinContainer' onClick={handleFacebookLogin}>
            <img src={FaceBook} alt='FaceBook' height={28} className='signupImages'></img>
            Login with Facebook
          </div>
          <div className='signinContainer' onClick={handleGoogleLogin}>
            <img src={Google} alt='Google' className='signupImages'></img>
            Login with Google
          </div>
      </div>
    </div>
  );
}

export default Login;
