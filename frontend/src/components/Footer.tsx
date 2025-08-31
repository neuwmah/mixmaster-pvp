import React from 'react';

const Footer: React.FC = async () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-center text-white py-4 mt-auto bg-(--gray-0) relative z-1">
      <p className="text-sm text-center">
        &copy; {currentYear} MixMaster PVP ⚔️
      </p>
    </footer>
  )
};

export default Footer;