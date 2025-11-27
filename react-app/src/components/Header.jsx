function Header({ userName, onProfileClick }) {
  return (
    <div className="header">
      <div className="header-content">
        <div className="logo">
          <span>💳</span>
          <span>PayFlow</span>
        </div>
        <div className="user-info">
          <div>
            <div style={{ fontWeight: 600 }}>Welcome Back!</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>{userName || 'Loading...'}</div>
          </div>
          <div className="profile-icon" onClick={onProfileClick}>
            👤
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
