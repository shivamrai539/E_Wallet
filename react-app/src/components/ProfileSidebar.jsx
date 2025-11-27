function ProfileSidebar({ isOpen, onClose, userData, onLogout, onEditProfile }) {
  return (
    <div className={`profile-sidebar ${isOpen ? 'active' : ''}`}>
      <div className="sidebar-top-header">
        <span className="sidebar-title">Settings</span>
        <button className="close-sidebar-btn" onClick={onClose}>&times;</button>
      </div>

      <div className="sidebar-profile-card">
        <div className="profile-icon-large">👤</div>
        <h3>{userData?.userName || 'Your Name'}</h3>
        <span>{userData?.userEmail || 'your.email@example.com'}</span>
      </div>

      <div className="sidebar-menu">
        <div className="sidebar-section-title">Payments profile</div>
        <div className="sidebar-info-item">
          <span className="info-label">Name</span>
          <span className="info-value">{userData?.userName || ''}</span>
        </div>
        <div className="sidebar-info-item">
          <span className="info-label">Mobile</span>
          <span className="info-value">{userData?.mobile || 'Not set'}</span>
        </div>
        <div className="sidebar-info-item">
          <span className="info-label">Address</span>
          <span className="info-value">{userData?.address || 'Not set'}</span>
        </div>
        <a href="#" className="sidebar-edit-link" onClick={(e) => { e.preventDefault(); onEditProfile(); }}>
          <span>✏️</span> Edit Profile
        </a>
      </div>

      <div className="sidebar-logout-section">
        <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="logout-link">
          <span>🔴</span> Logout
        </a>
      </div>
    </div>
  );
}

export default ProfileSidebar;
