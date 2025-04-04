import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
      <p className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} By Raunak and Suraj. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
