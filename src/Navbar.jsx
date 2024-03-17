import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-gray-800 top-0 w-full md:mx-auto text-text-light-gray shadow-lg shadow-black px-16">
      <div className="mx-auto py-10 flex justify-between align-middle">
        <Link to="/" className="text-3xl font-bold text-blue-500">
          Home
        </Link>
        <div className="hidden md:flex">
          <Link to="/totalcost" className="mx-4">
            Total Cost
          </Link>
          <Link to="/componentpage" className="mx-4">
            Component List
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
