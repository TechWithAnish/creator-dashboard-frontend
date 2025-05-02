import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpgradePlan = () => {
  const navigate = useNavigate();
  const userCredits = localStorage.getItem('credits') || 0;

  const plans = [
    { name: 'Basic', credits: 500, price: '$5/month' },
    { name: 'Pro', credits: 2000, price: '$15/month' },
    { name: 'Premium', credits: 5000, price: '$30/month' },
  ];

  const handleSelectPlan = (plan) => {
    alert(`Selected ${plan.name} plan! Redirecting to payment... (Mock action)`);
    // In a real app, this would redirect to a payment gateway
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Upgrade Your Plan</h2>
        <div>
          <span className="me-3">Credits: {userCredits}</span>
          <button className="btn btn-primary me-2" onClick={() => navigate('/feed')}>
            Back to Feed
          </button>
          <button className="btn btn-danger" onClick={() => navigate('/login')}>
            Logout
          </button>
        </div>
      </div>
      <div className="row">
        {plans.map((plan, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">{plan.name}</h4>
              </div>
              <div className="card-body">
                <p><strong>Credits:</strong> {plan.credits}</p>
                <p><strong>Price:</strong> {plan.price}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleSelectPlan(plan)}
                >
                  Select Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePlan;