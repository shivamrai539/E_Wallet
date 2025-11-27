import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    setIsLoading(true);

    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch('/register', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Account created successfully! Please log in.');
        navigate('/login');
      } else {
        alert('Registration Failed: ' + result.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
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
          <h1>Join PayFlow Today</h1>
          <p>Your new secure and instant digital wallet is just a few clicks away.</p>

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
            <h2>Create Your Account</h2>
            <p>Enter your details to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <span className="input-icon">👤</span>
              </div>
            </div>

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
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="input-icon">👁️</span>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <div className="signup-link" style={{ marginTop: '20px' }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
