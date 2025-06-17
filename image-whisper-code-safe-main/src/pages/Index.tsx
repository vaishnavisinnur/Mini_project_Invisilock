
import React, { useState, useCallback } from 'react';
import { toast } from "sonner";
import { processImage } from '@/utils/imageEncryption';
import Header from '@/components/Header';
import ImageUpload from '@/components/ImageUpload';
import PasswordInput from '@/components/PasswordInput';
import ImagePreview from '@/components/ImagePreview';
import ActionButtons from '@/components/ActionButtons';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = useCallback((file: File) => {
    setSelectedImage(file);
    setProcessedImageUrl(null);
    
    const url = URL.createObjectURL(file);
    setOriginalImageUrl(url);
  }, []);

  const handleClearImage = useCallback(() => {
    setSelectedImage(null);
    setOriginalImageUrl(null);
    setProcessedImageUrl(null);
  }, []);

  const handleEncrypt = useCallback(async () => {
    if (!selectedImage || !password) return;
    
    setIsProcessing(true);
    try {
      const result = await processImage(selectedImage, password);
      setProcessedImageUrl(result);
      setIsEncrypted(true);
      toast.success("Image encrypted successfully!");
    } catch (error) {
      console.error('Encryption failed:', error);
      toast.error("Encryption failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, password]);

  const handleDecrypt = useCallback(async () => {
    if (!selectedImage || !password) return;
    
    setIsProcessing(true);
    try {
      const result = await processImage(selectedImage, password);
      setProcessedImageUrl(result);
      setIsEncrypted(false);
      toast.success("Image decrypted successfully!");
    } catch (error) {
      console.error('Decryption failed:', error);
      toast.error("Decryption failed. Check if the password is correct.");
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, password]);

  const handleDownload = useCallback(() => {
    if (!processedImageUrl) return;
    
    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = `${isEncrypted ? 'encrypted' : 'decrypted'}_${selectedImage?.name || 'image.png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Image ${isEncrypted ? 'encrypted' : 'decrypted'} and downloaded!`);
  }, [processedImageUrl, isEncrypted, selectedImage]);

  const handleReset = useCallback(() => {
    setSelectedImage(null);
    setOriginalImageUrl(null);
    setProcessedImageUrl(null);
    setPassword('');
    setIsEncrypted(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-crypto-light">
      <div className="container max-w-5xl mx-auto px-4 py-8 flex-grow">
        <Header />
        
        <main className="mt-8">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <ImageUpload 
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClearImage={handleClearImage}
            />
            
            {selectedImage && (
              <PasswordInput 
                password={password}
                setPassword={setPassword}
                isProcessing={isProcessing}
              />
            )}
            
            {selectedImage && (
              <ActionButtons 
                onEncrypt={handleEncrypt}
                onDecrypt={handleDecrypt}
                onDownload={handleDownload}
                onReset={handleReset}
                hasOriginalImage={!!originalImageUrl}
                hasProcessedImage={!!processedImageUrl}
                hasPassword={password.length >= 8}
                isProcessing={isProcessing}
              />
            )}
            
            <ImagePreview 
              originalImage={originalImageUrl}
              processedImage={processedImageUrl}
              isEncrypted={isEncrypted}
              isLoading={isProcessing}
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
