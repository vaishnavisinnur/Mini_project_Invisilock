
import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClearImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageSelect, 
  selectedImage,
  onClearImage
}) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  return (
    <div className="w-full mx-auto">
      {!selectedImage ? (
        <div 
          className="border-2 border-dashed border-app-border rounded-lg p-8 text-center cursor-pointer hover:border-app-accent transition-colors bg-app-primary"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-app-secondary flex items-center justify-center">
              <Upload className="h-6 w-6 text-app-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-app-text">
                Drag & Drop or Browse files
              </h3>
              <p className="text-sm text-app-accent">
                Files are not uploaded to a server, everything is done offline in your browser.
              </p>
            </div>
            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              className="sr-only" 
              accept="image/*"
              onChange={handleFileChange}
            />
            <button className="px-6 py-2 bg-app-secondary text-app-text rounded-lg hover:bg-app-accent hover:text-white transition-colors">
              Browse Files
            </button>
          </div>
        </div>
      ) : (
        <div className="relative border rounded-lg p-4 bg-app-primary">
          <div className="flex items-center justify-between">
            <span className="text-sm truncate max-w-[250px] text-app-text">{selectedImage.name}</span>
            <span className="text-xs text-app-accent">
              {(selectedImage.size / 1024).toFixed(1)} KB
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-app hover:bg-app-secondary"
            onClick={onClearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;