import React from "react";
import { FiCode, FiGitBranch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FiGitBranch className="text-white" size={24} />
          <span className="text-xl font-bold">DiffCompare AI</span>
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline flex items-center">
                <FiCode className="mr-1" />
                Compare
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
