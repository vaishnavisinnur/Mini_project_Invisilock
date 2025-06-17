
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  isProcessing: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  password, 
  setPassword,
  isProcessing
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = (pwd: string): {
    strength: 'weak' | 'medium' | 'strong';
    color: string;
    width: string;
  } => {
    if (!pwd) {
      return { strength: 'weak', color: 'bg-gray-200', width: 'w-0' };
    }
    
    if (pwd.length < 8) {
      return { strength: 'weak', color: 'bg-red-500', width: 'w-1/4' };
    }
    
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    
    const score = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (pwd.length >= 12 && score >= 3) {
      return { strength: 'strong', color: 'bg-green-500', width: 'w-full' };
    } else if (pwd.length >= 8 && score >= 2) {
      return { strength: 'medium', color: 'bg-yellow-500', width: 'w-2/4' };
    } else {
      return { strength: 'weak', color: 'bg-red-500', width: 'w-1/4' };
    }
  };
  
  const { strength, color, width } = getPasswordStrength(password);

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
        Encryption Password
      </label>
      <div className="relative mt-1">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your encryption password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pr-10"
          disabled={isProcessing}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          onClick={togglePasswordVisibility}
          disabled={isProcessing}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full ${color} ${width} transition-all duration-300`}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Password strength: {strength}</span>
          {password && password.length < 8 && (
            <span className="flex items-center text-red-500">
              <AlertCircle className="h-3 w-3 mr-1" />
              Minimum 8 characters
            </span>
          )}
        </div>
      </div>
      
      {password && strength === 'weak' && (
        <p className="text-xs text-gray-500 mt-2">
          Tip: Use a mix of uppercase, lowercase, numbers, and special characters
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
