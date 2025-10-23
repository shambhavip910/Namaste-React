import { LOGO_URL } from "../utils/constant";
import { CART_IMG } from "../utils/constant";
import { useState } from "react";

 const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src={LOGO_URL}
          alt="logo"
        />
      </div>
      <div className="title">Taste Without The Wait</div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <button className="login-btn"
            onClick={() => {
           btnName==="Login"? setBtnName("Logout"):setBtnName("Login");
            }
          }>
            {btnName}
          </button>
          <li>
            <img
              className="cart"
              src={CART_IMG}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;