import React, { useState } from 'react';
import img from './labmain6.webp';

const initialCustomerData = [
  {
    phone: '1234567890',
    name: 'John Doe',
    address: '123 Main St',
    testName: 'Blood Test',
    testReport: ''
  },
  {
    phone: '0987654321',
    name: 'Jane Smith',
    address: '456 Elm St',
    testName: 'X-Ray',
    testReport: ''
  },
  // Add more customer data as needed
];

export default function Report() {
  const [phone, setPhone] = useState('');
  const [customerData, setCustomerData] = useState(initialCustomerData);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setPhone('');
      return;
    }
  };

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedCustomerData = [...customerData];
      updatedCustomerData[index].testReport = file.name;
      setCustomerData(updatedCustomerData);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      opacity:'0.8'
    }}>
      <form onSubmit={handleSearch} style={{ marginBottom: '95px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <input 
          type="text" 
          placeholder="Enter customer phone number" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            padding: '10px',
            marginTop:"40px",
            fontSize: '16px',
            width: '500px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button type="submit" style={{
          padding: '10px 20px',
          marginTop:"40px",
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
        }}>Search</button>
      </form>
      <table style={{ borderCollapse: 'collapse', width: '80%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Customer Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Address</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Test Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Test Report</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.address}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.testName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {customer.testReport ? (
                  customer.testReport
                ) : (
                  <label style={{ cursor: 'pointer', color: '#4CAF50' }}>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileUpload(e, index)}
                      style={{ display: 'none' }}
                    />
                    <button style={{
                      padding: '5px 15px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      border: 'none',
                      backgroundColor: '#007BFF',
                      color: 'white',
                      cursor: 'pointer',
                    }}>Upload</button>
                  </label>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
