import React from 'react';

export default function ComplaintSystem() {
  return (
    <div>
      <h2>Complaint Portal</h2>
      <div className="input-group">
        <input type="text" placeholder="Enter complaint here..." />
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
}