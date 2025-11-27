function BalanceCard({ balance, walletId }) {
  return (
    <div className="balance-card">
      <div className="balance-label">Total Balance</div>
      <div className="balance-amount">₹{balance?.toFixed(2) || '0.00'}</div>
      <div className="wallet-id">Wallet ID: {walletId || '...'}</div>
    </div>
  );
}

export default BalanceCard;
