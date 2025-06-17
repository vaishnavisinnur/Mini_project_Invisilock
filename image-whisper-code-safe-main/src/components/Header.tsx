

import React from 'react';
import { Shield, Lock } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 text-center">
      <div className="flex items-center justify-center mb-4">
        {/* <Shield className="w-8 h-8 mr-2 text-crypto-secondary" /> */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-crypto-secondary to-crypto-accent bg-clip-text text-transparent">
          InvisiLock
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Secure your images with password-based encryption. Upload an image, set a password,
        and encrypt or decrypt with ease.
      </p>
      <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
        <Lock className="w-4 h-4 mr-1" />
        <span>All processing happens in your browser - your images never leave your device</span>
      </div>
    </header>
  );
};

export default Header;
