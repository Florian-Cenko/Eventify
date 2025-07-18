import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userPic from '../Images/user.png';



function Header({ isLoggedIn, setIsLoggedIn }) {

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const adminUsername = localStorage.getItem("adminUsername");



  return (
    <header className="bg-white border-bottom sticky-top shadow-sm z-3 w-100">
      <div className="d-flex justify-content-center">
        <div className="w-100 px-4" style={{ maxWidth: "1440px" }}>
          <div className="d-flex align-items-center justify-content-between py-4">

            {/* Logo */}
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <img src="/logoTransparent.png" alt="Logo" className="me-2" style={{ height: "30px", maxHeight: "10vh" }} />

            </Link>

            {/* Search bar */}
            <form
              className="d-none d-md-flex flex-grow-1 mx-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchTerm.trim() !== "") {
                  navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
                  setSearchTerm("");
                }
              }}
            >
              <input
                className="form-control me-2 rounded-pill px-3"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>


            {/* Navigation & User */}
            <div className="d-flex align-items-center gap-3" >
              {adminUsername ? (
  <>
    <nav className="d-none d-lg-flex gap-3">
      <Link to="/AdminDashboard" className="text-dark text-decoration-none nav-link">Dashboard</Link>
      <Link to="/EventsPageAdmin" className="text-dark text-decoration-none nav-link">Events</Link>
      <Link to="/AdminUsers" className="text-dark text-decoration-none nav-link">Users</Link>
    </nav>
    <button className="btn btn-outline-danger rounded-pill px-3 ms-2"
      onClick={() => {
        localStorage.removeItem("adminUsername");
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
        navigate("/login");
      }}
    >
      Logout
    </button>
  </>
) : (
  <>
    <nav className="d-none d-lg-flex gap-3">
      <Link to="/Home" className="text-dark text-decoration-none nav-link">Home</Link>
      <Link to="/AboutUs" className="text-dark text-decoration-none nav-link">About Us</Link>
      <Link to="/events" className="text-dark text-decoration-none nav-link">Events</Link>
      <Link to="/contact" className="text-dark text-decoration-none nav-link">Contact Us</Link>
    </nav>

    {isLoggedIn ? (
      <div className="dropdown">
        <button
          className="btn btn-light border rounded-circle p-0"
          type="button"
          id="dropdownUser"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={userPic}
            alt="avatar"
            className="rounded-circle"
            style={{ width: "36px", height: "36px" }}
          />
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
          <li><Link className="dropdown-item" to={`/PersonalProfile/${username}`}>Profile</Link></li>
          <li><Link className="dropdown-item" to={`/reservations/${username}`}>My Reservations</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><button className="dropdown-item" onClick={() => {
            setIsLoggedIn(false);
            navigate("/LogIn");
          }}>Logout</button></li>
        </ul>
      </div>
    ) : (
      <div className="d-flex gap-2">
        <Link to="/login" className="btn btn-outline-primary rounded-pill px-3">Login</Link>
        <Link to="/signup" className="btn btn-primary rounded-pill px-3">Sign Up</Link>
      </div>
    )}
  </>
)}

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
