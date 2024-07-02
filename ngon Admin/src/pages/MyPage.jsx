import React, {useState} from 'react'
import Header from '../components/Header/Header'
import { Button } from '@mui/material'
import authApi from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import Changepass from '../components/Account/Changepass'

const MyPage = () => {
    const navigate = useNavigate();

    const [isChangepassOpen, setIsChangepassOpen] = useState(false);

  // Function to toggle the Changepass dialog visibility
    const handleChangePassword = () => {
     setIsChangepassOpen(!isChangepassOpen);
    };
    const handleLogout = () => {
        const logout = async () => {
          try {
            const response = await authApi.logout();
            if (response.status === 200) {
              localStorage.clear();
              navigate("/login"); // Ensure 'navigate' is imported from 'react-router-dom' or your routing library
            }
          } catch (error) {
            console.error(error);
          }
        };
        logout(); // Call the logout function
    } 

  return (   
    <div className='container' style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100vh' // Adjust the height as needed to fill the screen or container
    }}>
        <Header />
        
        <Button
          variant="contained"
          size="medium"
          color="primary"
          sx={{
            fontWeight: "500",
            textTransform: "initial",
            width : "300px",
            mb: 2,
          }}
            onClick={handleChangePassword}
        >
          Change Password
        </Button>
      
      
        <Button
          variant="contained"
          size="medium"
          color="primary"
          sx={{
            fontWeight: "500",
            textTransform: "initial",
            width : "300px",
            mb: 2,
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      
      <Changepass open={isChangepassOpen} onClose={handleChangePassword} />
    </div>
  )
}

export default MyPage