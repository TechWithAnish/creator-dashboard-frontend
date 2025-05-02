import React, { useState } from 'react';
     import axios from 'axios';
     import { useNavigate } from 'react-router-dom';

     const Plans = () => {
       const [error, setError] = useState('');
       const navigate = useNavigate();

       const handlePurchase = async (plan) => {
         try {
           const token = localStorage.getItem('token');
           const res = await axios.post(
             'http://localhost:5000/api/credits/purchase',
             { plan },
             { headers: { Authorization: `Bearer ${token}` } }
           );
           localStorage.setItem('credits', res.data.credits);
           localStorage.setItem('plan', res.data.plan);
           alert(`Purchased ${plan} plan! Credits: ${res.data.credits}`);
           navigate('/feed');
         } catch (err) {
           setError('Failed to purchase plan');
           console.error('Purchase error:', err);
         }
       };

       return (
         <div style={{ maxWidth: '600px', margin: '20px auto', padding: '0 10px' }}>
           <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Choose a Plan</h2>
           {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
           <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
             <div
               style={{
                 padding: '20px',
                 border: '1px solid #ccc',
                 borderRadius: '5px',
                 flex: '1',
                 minWidth: '200px',
               }}
             >
               <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Basic</h3>
               <p style={{ color: '#666' }}>100 Credits</p>
               <button
                 onClick={() => handlePurchase('Basic')}
                 style={{
                   padding: '10px 20px',
                   backgroundColor: '#0066cc',
                   color: 'white',
                   border: 'none',
                   borderRadius: '4px',
                   cursor: 'pointer',
                   marginTop: '10px',
                 }}
               >
                 Purchase
               </button>
             </div>
             <div
               style={{
                 padding: '20px',
                 border: '1px solid #ccc',
                 borderRadius: '5px',
                 flex: '1',
                 minWidth: '200px',
               }}
             >
               <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Premium</h3>
               <p style={{ color: '#666' }}>500 Credits</p>
               <button
                 onClick={() => handlePurchase('Premium')}
                 style={{
                   padding: '10px 20px',
                   backgroundColor: '#0066cc',
                   color: 'white',
                   border: 'none',
                   borderRadius: '4px',
                   cursor: 'pointer',
                   marginTop: '10px',
                 }}
               >
                 Purchase
               </button>
             </div>
           </div>
         </div>
       );
     };

     export default Plans;