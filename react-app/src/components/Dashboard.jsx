import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import BalanceCard from './BalanceCard';
import QuickActions from './QuickActions';
import TransactionList from './TransactionList';
import TransferModal from './TransferModal';
import AddFundsModal from './AddFundsModal';
import ReceiveModal from './ReceiveModal';
import ProfileModal from './ProfileModal';
import ProfileSidebar from './ProfileSidebar';
import './Dashboard.css';

function Dashboard({ onLogout }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/dashboard-data');

      if (!response.ok) {
        if (response.status === 401) {
          alert('You are not logged in. Redirecting to login page.');
          navigate('/login');
        }
        throw new Error('Failed to load data.');
      }

      const data = await response.json();

      if (data.success) {
        setDashboardData(data);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/logout');
    alert("You have been logged out.");
    onLogout();
    navigate('/login');
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleTransactionSuccess = () => {
    closeModal();
    loadDashboardData();
  };

  if (!dashboardData) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const displayedTransactions = showAllTransactions
    ? dashboardData.transactions
    : dashboardData.transactions.slice(0, 4);

  return (
    <div className="dashboard">
      <Header
        userName={dashboardData.userName}
        onProfileClick={toggleSidebar}
      />

      <div className="dashboard-container">
        <BalanceCard
          balance={dashboardData.balance}
          walletId={dashboardData.walletId}
        />

        <QuickActions onActionClick={openModal} />

        <div className="section-header">
          <div className="section-title">Recent Transactions</div>
          <a
            href="#"
            className="view-all"
            onClick={(e) => {
              e.preventDefault();
              setShowAllTransactions(!showAllTransactions);
            }}
          >
            {showAllTransactions ? 'Show Less' : 'View All'}
          </a>
        </div>

        <TransactionList transactions={displayedTransactions} />
      </div>

      {activeModal === 'transfer' && (
        <TransferModal
          onClose={closeModal}
          onSuccess={handleTransactionSuccess}
          currentBalance={dashboardData.balance}
        />
      )}

      {activeModal === 'addFunds' && (
        <AddFundsModal
          onClose={closeModal}
          onSuccess={handleTransactionSuccess}
        />
      )}

      {activeModal === 'receive' && (
        <ReceiveModal onClose={closeModal} />
      )}

      {activeModal === 'profile' && (
        <ProfileModal
          onClose={closeModal}
          onSuccess={loadDashboardData}
        />
      )}

      <ProfileSidebar
        isOpen={showSidebar}
        onClose={toggleSidebar}
        userData={dashboardData}
        onLogout={handleLogout}
        onEditProfile={() => {
          toggleSidebar();
          openModal('profile');
        }}
      />

      {showSidebar && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default Dashboard;
