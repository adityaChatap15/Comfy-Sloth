import React from "react";
import Logo from "../assests/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/ContextProvider";
import useProductStore from "../store/productStore";

const sidebarLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Products",
    url: "/products",
  },
];

const Sidebar = () => {
  const { signOut, user } = useAuth();
  const { cartItem, showSidebar, setShowSidebar } = useProductStore(
    (state) => ({
      cartItem: state.cartItem,
      showSidebar: state.showSidebar,
      setShowSidebar: state.setShowSidebar,
    })
  );

  const navigate = useNavigate();

  const handleSidebarClick = () => {
    setShowSidebar(false);
  };

  const handleCartClick = () => {
    setShowSidebar(false);
    navigate("/cart");
  };
  const handleLogout = () => {
    signOut();
    setShowSidebar(false);
    navigate("/");
    alert("Succesfully sign out");
  };
  const goToLogin = () => {
    navigate("/login");
    setShowSidebar(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 bg-white z-50 w-screen h-screen flex flex-col gap-8 px-5 py-4 ${
        showSidebar ? "-translate-x-0" : "-translate-x-full"
      } transition-all duration-300 ease-linear`}
    >
      <div className="flex flex-col items-start  gap-5  ">
        <div className="flex items-center justify-between w-full">
          <Link to={"/"} onClick={() => setShowSidebar(false)}>
            <img src={Logo} alt="logo" className="w-[10em]" />
          </Link>
          <div>
            <CloseIcon
              onClick={handleSidebarClick}
              fontSize="large"
              style={{ color: "red", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="flex flex-col px-5 text-[#324D67] items-start justify-center gap-7">
          {sidebarLinks.map((link, idx) => (
            <Link
            key={idx}
              to={link.url}
              className="tracking-widest"
              onClick={handleSidebarClick}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div
          onClick={handleCartClick}
          className="flex items-center justify-center gap-2 cursor-pointer relative"
        >
          <h2 className="text-[28px]">Cart</h2>
          <ShoppingCartIcon fontSize="large" />
          <span className="w-6 h-6 bg-[#AB7A5F] rounded-full absolute -right-1 -top-2 flex items-center justify-center text-white text-sm">
            {cartItem.length}
          </span>
        </div>
        <div
          onClick={user ? handleLogout : goToLogin}
          className="flex items-center justify-center gap-2 cursor-pointer"
        >
          <h2 className="text-[28px]">{user ? "Logout" : "Login"} </h2>
          <div className="flex items-center ">
            <PersonIcon fontSize="large" />
            <span className="font-medium text-4xl">-</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
