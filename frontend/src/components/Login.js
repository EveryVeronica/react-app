// Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const authInstance = getAuth(auth);
    
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;

      // Check if it's the first login and update profile
      if (user && user.metadata.creationTime === user.metadata.lastSignInTime) {
        // Assume you have input fields for first name and last name
        const firstName = "John"; // Replace with your actual value
        const lastName = "Doe"; // Replace with your actual value

        // Update user profile
        await user.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
      }

      // TODO: Handle successful login, e.g., redirect or update UI
      console.log('Login successful. User:', user);
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
