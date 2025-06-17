
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Lock, Unlock, RefreshCw } from 'lucide-react';

interface ActionButtonsProps {
  onEncrypt: () => void;
  onDecrypt: () => void;
  onDownload: () => void;
  onReset: () => void;
  hasOriginalImage: boolean;
  hasProcessedImage: boolean;
  hasPassword: boolean;
  isProcessing: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onEncrypt, 
  onDecrypt, 
  onDownload, 
  onReset,
  hasOriginalImage, 
  hasProcessedImage, 
  hasPassword,
  isProcessing
}) => {
  return (
    <div className="w-full max-w-md mx-auto mt-6 flex flex-wrap gap-4 justify-center">
      <Button
        onClick={onEncrypt}
        disabled={!hasOriginalImage || !hasPassword || isProcessing}
        className="bg-crypto-primary hover:bg-crypto-accent text-white"
      >
        <Lock className="mr-2 h-4 w-4" />
        Encrypt
      </Button>
      
      <Button
        onClick={onDecrypt}
        disabled={!hasOriginalImage || !hasPassword || isProcessing}
        variant="outline"
        className="border-crypto-secondary text-crypto-secondary hover:bg-crypto-secondary hover:text-white"
      >
        <Unlock className="mr-2 h-4 w-4" />
        Decrypt
      </Button>
      
      {hasProcessedImage && (
        <Button
          onClick={onDownload}
          disabled={isProcessing}
          variant="secondary"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      )}
      
      <Button
        onClick={onReset}
        variant="ghost"
        disabled={isProcessing}
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
};

export default ActionButtons;
