import React, { useState } from 'react';
import axios from 'axios';
import VisibilityOff from '../../images/visibility-off.svg';
import VisibilityOn from '../../images/visibility-on.svg';
import Google from '../../images/google-icon.svg';
import FaceBook from '../../images/facebook-svg.png';
import GreenCheckIcon from '../../images/greenCheckIcon.svg';
import IncompletePasswordIcon from '../../images/incompletePasswordCircle.svg';
import './style.css'; 

function Signup() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordDetailsVisible, setIsPasswordDetailsVisible] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      alert('Please enter a valid email');
      return;
    }
    try {
      await axios.post('http://localhost:5000/signup', { email, password });
      alert('Signup successful');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className='wrapperForLogin'>
      <div className='containerForLoginForm'>
        <div className='headingText'>SignUp</div>
        <input
          className={`loginInput ${emailError ? 'errorInput' : ''}`}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <div className='errorText'>{emailError}</div>}
        <input
          className='loginInput'
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsPasswordDetailsVisible(true)}
          onBlur={() => setIsPasswordDetailsVisible(false)}
        />
        <input
          className='loginInput'
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <img
          className='eyeIconForSignup'
          alt='password Icon'
          src={isPasswordVisible ? VisibilityOff : VisibilityOn}
          title={isPasswordVisible ? 'Hide Password' : 'Show Password'}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        />
        {isPasswordDetailsVisible && (
          <div className='passwordContainer'>
            <div className='passwordHeadingText'>Password must be</div>
            <div className='passwordContentContainer'>
              <div className='passwordContent'>
                <img
                  alt='password'
                  className='passwordIcon'
                  src={password.length < 8 ? IncompletePasswordIcon : GreenCheckIcon}
                />
                Be at least 8 characters
              </div>
              <div className='passwordContent'>
                <img
                  alt='password'
                  className='passwordIcon'
                  src={/[A-Z]/.test(password) ? GreenCheckIcon : IncompletePasswordIcon}
                />
                Include an uppercase letter
              </div>
              <div className='passwordContent'>
                <img
                  alt='password'
                  className='passwordIcon'
                  src={/[a-z]/.test(password) ? GreenCheckIcon : IncompletePasswordIcon}
                />
                Include a lowercase letter
              </div>
              <div className='passwordContent'>
                <img
                  alt='password'
                  className='passwordIcon'
                  src={/\d/.test(password) ? GreenCheckIcon : IncompletePasswordIcon}
                />
                Include a number
              </div>
              <div className='passwordContent'>
                <img
                  alt='password'
                  className='passwordIcon'
                  src={/[^a-zA-Z0-9]/.test(password) ? GreenCheckIcon : IncompletePasswordIcon}
                />
                Include at least one special character
              </div>
            </div>
          </div>
        )}
        <div
          className={`loginButton ${!email || !password || !confirmPassword || emailError ? 'disabledButton' : ''}`}
          type="submit"
          onClick={() => email && password && confirmPassword && password === confirmPassword && !emailError && handleSubmit()}
        >
          SignUp
        </div>
        <div className='signUpLinkText'>
          Already have an account?
          <div className='forgotPasswordText' onClick={() => window.location.assign('/login')}> Login</div>
        </div>
        <div style={{ width: '80%' }}>
          <div className='signUpText'>OR</div>
          <div className='signupContainer'></div>
        </div>
        <div className='signinContainer'>
          <img src={FaceBook} alt='FaceBook' height={28} className='signupImages'></img>
          Login with Facebook
        </div>
        <div className='signinContainer'>
          <img src={Google} alt='Google' className='signupImages'></img>
          Login with Google
        </div>
      </div>
    </div>
  );
}

export default Signup;
