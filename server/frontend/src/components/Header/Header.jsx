import React from 'react';
import "../assets/style.css";

const Header = () => {
  const logout = async () => {
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET"
    });

    const json = await res.json();
    if (json) {
      sessionStorage.removeItem("userName");
      window.location.href = window.location.origin;
    }
  };

  let userName = sessionStorage.getItem("userName");
  let isLoggedIn = userName !== null && userName !== "";

  return (
    <nav className="navbar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#1a5276',
        color: 'white'
      }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Dealerships</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
        <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a>
        <a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a>
        <a href="/dealers" style={{ color: 'white', textDecoration: 'none' }}>Dealers</a>
        {isLoggedIn ? (
          <>
            <span>Welcome, {userName}!</span>
            <button onClick={logout}
              style={{
                backgroundColor: 'white',
                color: '#1a5276',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login"
              style={{
                backgroundColor: 'white',
                color: '#1a5276',
                padding: '8px 15px',
                borderRadius: '5px',
                textDecoration: 'none'
              }}>Login</a>
            <a href="/register"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '8px 15px',
                border: '1px solid white',
                borderRadius: '5px',
                textDecoration: 'none'
              }}>Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
