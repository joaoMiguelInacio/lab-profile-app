import React from 'react';
import axios from 'axios';

const Logout =  () => {
    const API_URL = 'http://localhost:5005';
    try {
      axios.delete(`${API_URL}/api/auth/logout`);
    } catch ( error ) {
        console.log(error);
    }

  return (
    <p>You have been Logged Out</p>
  )
  };

export default Logout;
