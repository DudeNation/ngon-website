import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import authApi from '../../api/authApi';

export default function PrivateRoute({ component: Component, ...rest }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const expireAt = localStorage.getItem('expireAt');
      const now = new Date();
      const expirationDate = new Date(expireAt);
    
      if (expirationDate <= now) {
        // Token has expired
        setIsAuthenticated(false);
        setIsLoading(false);
        localStorage.removeItem('token');
        localStorage.removeItem('expireAt'); 
      } else {
        // Token is still valid, check authentication status
        authApi.checkAuth()
          .then(response => {
            setIsAuthenticated(response.data.isAuthenticated);
            setIsLoading(false);
          })
          .catch(error => {
            setIsLoading(false);
            // Optionally, handle error (e.g., by setting isAuthenticated to false)
          });
      }
    }, []);
  
    if (isLoading) {
      return <div>Loading...</div>; // Replace this with your loading component or spinner
    }
  
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
  }