
// Function to generate a deterministic key from a password
export const generateKey = (password: string, length: number): Uint8Array => {
  const key = new Uint8Array(length);
  
  // Simple key derivation function
  const passwordBytes = new TextEncoder().encode(password);
  
  for (let i = 0; i < length; i++) {
    let value = 0;
    for (let j = 0; j < passwordBytes.length; j++) {
      value += passwordBytes[j] * ((i + j + 1) % 256);
    }
    key[i] = value % 256;
  }
  
  return key;
};

// Function to encrypt/decrypt image data using XOR
export const processImageData = (
  imageData: Uint8ClampedArray, 
  password: string
): Uint8ClampedArray => {
  // Create a copy of the image data
  const processedData = new Uint8ClampedArray(imageData.length);
  
  // Generate key from password
  const key = generateKey(password, imageData.length);
  
  // XOR each byte with the corresponding key byte
  for (let i = 0; i < imageData.length; i++) {
    // Only transform RGB values, leave alpha channel untouched
    if (i % 4 !== 3) {
      processedData[i] = imageData[i] ^ key[i];
    } else {
      processedData[i] = imageData[i]; // Keep alpha channel as is
    }
  }
  
  return processedData;
};

// Convert an image file to ImageData using canvas
export const imageFileToImageData = (
  file: File
): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        resolve(imageData);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

// Convert ImageData back to a data URL
export const imageDataToDataURL = (
  imageData: ImageData, 
  type: string = 'image/png'
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL(type);
};

// Main function to encrypt/decrypt an image file
export const processImage = async (
  file: File, 
  password: string
): Promise<string> => {
  try {
    // Convert file to ImageData
    const imageData = await imageFileToImageData(file);
    
    // Process the image data
    const processedData = processImageData(imageData.data, password);
    
    // Create a new ImageData object
    const processedImageData = new ImageData(
      processedData,
      imageData.width,
      imageData.height
    );
    
    // Convert back to data URL
    return imageDataToDataURL(processedImageData);
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};
