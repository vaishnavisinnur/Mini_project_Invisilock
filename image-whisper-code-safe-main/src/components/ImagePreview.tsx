
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ImagePreviewProps {
  originalImage: string | null;
  processedImage: string | null;
  isEncrypted: boolean;
  isLoading: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  originalImage, 
  processedImage, 
  isEncrypted,
  isLoading 
}) => {
  if (!originalImage && !processedImage) {
    return null;
  }

  const renderPreviewImage = (src: string | null, label: string) => {
    if (!src) return null;
    
    return (
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-2">{label}</span>
        <div className="rounded-lg overflow-hidden bg-gray-100 border shadow-sm relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-8 h-8 border-4 border-crypto-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : null}
          <img 
            src={src} 
            alt={label}
            className="max-w-full h-auto object-contain"
            style={{ maxHeight: '300px' }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mt-8">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-start">
        {renderPreviewImage(originalImage, 'Original Image')}
        
        {processedImage && (
          <>
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-crypto-secondary flex items-center justify-center text-white">
                →
              </div>
              {isEncrypted ? (
                <span className="text-xs mt-2">Encrypted</span>
              ) : (
                <span className="text-xs mt-2">Decrypted</span>
              )}
            </div>
            
            {renderPreviewImage(
              processedImage, 
              isEncrypted ? 'Encrypted Image' : 'Decrypted Image'
            )}
          </>
        )}
      </div>
      
      {processedImage && isEncrypted && (
        <div className="mt-4 flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-700">
            <strong>Important:</strong> Make sure to remember your password! There is no way to recover 
            an encrypted image if you forget the password used for encryption.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
