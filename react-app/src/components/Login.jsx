import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Login successful! Redirecting...');
        onLogin();
        navigate('/dashboard');
      } else {
        alert('Login Failed: ' + result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="left-panel">
          <div className="logo">
            <div className="logo-icon">💳</div>
            <span>PayFlow</span>
          </div>
          <h1>Welcome Back to Your Digital Wallet</h1>
          <p>Manage your finances securely and efficiently with our advanced e-wallet platform.</p>

          <div className="features">
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <span>Bank-level security encryption</span>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <span>Instant money transfers</span>
            </div>
            <div className="feature">
              <div className="feature-icon">📊</div>
              <span>Real-time transaction tracking</span>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="login-header">
            <h2>Login to Your Account</h2>
            <p>Enter your credentials to access your wallet</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="input-icon">📧</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="input-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <div className="remember-forgot">
              <label className="remember-me">
                <input type="checkbox" id="remember" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="social-login">
            <button className="social-btn" style={{ maxWidth: '100%' }}>
              <span>📱</span>
              <span>Login with Phone Number</span>
            </button>
          </div>

          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
