import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-4 fixed bottom-0 w-full">
      <p className="text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} By Raunak Kumar, Suraj Kumar pandey  and T.Rama Harish. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;