// services/api.js
import axios from 'axios';

const baseURL = 'http://localhost:5000'; // Update with your server URL




export const logged = async (token) => {
  try {
     const response = await axios.get(`${baseURL}/logged`, {
       headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
       },
     });

     // Return ข้อมูลที่ได้จากการเรียก API
     return response.data;
  } catch (error) {
     console.error('Error in logged:', error.message);
     throw error;
  }
};





export const getData = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/user_data`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in getData:', error.message);
    throw error;
  }
};

export const saveData = async (token, data) => {
  try {
    const response = await axios.post(`${baseURL}/saveData`, { data }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in saveData:', error.message);
    throw error;
  }
};

// Add more API functions as needed
