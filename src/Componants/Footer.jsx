import React from 'react';
const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', padding: '40px 0', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>About Minaty.com</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><a href="#" style={linkStyle}>About Minaty.com</a></li>
            <li><a href="#" style={linkStyle}>Newsroom</a></li>
            <li><a href="#" style={linkStyle}>Careers</a></li>
            <li><a href="#" style={linkStyle}>Supply Chain Transparency</a></li>
            <li><a href="#" style={linkStyle}>Affiliates</a></li>
            <li><a href="#" style={linkStyle}>Minaty Global Sites</a></li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Minaty.com</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><a href="#" style={linkStyle}>My Account</a></li>
            <li><a href="#" style={linkStyle}>Booking Status</a></li>
            <li><a href="#" style={linkStyle}>Beauty Insider</a></li>
            <li><a href="#" style={linkStyle}>Flash Subscription</a></li>
            <li><a href="#" style={linkStyle}>Gift Cards</a></li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Help & FAQs</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><a href="#" style={linkStyle}>Online Booking</a></li>
            <li><a href="#" style={linkStyle}>Cancelation</a></li>
            <li><a href="#" style={linkStyle}>Refunds </a></li>
            <li><a href="#" style={linkStyle}>Contact Us</a></li>
            <li><a href="#" style={linkStyle}>Reservations</a></li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Ways to Book</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><a href="#" style={linkStyle}>Just Booked</a></li>
            <li><a href="#" style={linkStyle}>Best Rooms</a></li>
            <li><a href="#" style={linkStyle}>Weekly Specials</a></li>
            <li><a href="#" style={linkStyle}>Minaty Vouchers</a></li>
            <li><a href="#" style={linkStyle}>Gift Cards</a></li>
          </ul>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderTop: '1px solid #333', maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <form style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="email" style={{ fontSize: '14px', marginRight: '10px' }}>Subscribe for Minaty.com Emails</label>
            <input type="email" id="email" placeholder="Email address" style={inputStyle} />
            <button type="submit" style={buttonStyle}>Subscribe</button>
          </form>
        </div>
        <div>
          <select style={selectStyle}>
            <option value="US">South Africa</option>
            <option value="CA">Botswana </option>
            <option value="FR">France</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="#" style={iconStyle}><i className="fab fa-facebook-f"></i></a>
          <a href="#" style={iconStyle}><i className="fab fa-twitter"></i></a>
          <a href="#" style={iconStyle}><i className="fab fa-instagram"></i></a>
          <a href="#" style={iconStyle}><i className="fab fa-youtube"></i></a>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '10px 0', fontSize: '12px', color: '#aaa' }}>
        <p>© 2024 maning.com Sa, Inc. All rights reserved. Terms of Use | Privacy Policy</p>
        <p>958 - 0860 Thobeka SA  (0734004442)</p>
      </div>
    </footer>
  );
};
export default Footer;