import React from "react";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <a className="navbar-brand" href="/">
      Crowdfund
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarnav"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarnav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="#">
            Explore
          </a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="#">
            How it works
          </a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="#">
            Get started
          </a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="/login">
            Login
          </a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="#">
            About us
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
