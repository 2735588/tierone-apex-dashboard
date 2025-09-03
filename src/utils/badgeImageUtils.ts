// Utility functions for badge image processing

/**
 * Crops an image to a perfect circle, removing square backgrounds
 * @param imageUrl - URL of the image to crop
 * @returns Promise<string> - Data URL of the cropped circular image
 */
export async function cropBadgeToCircle(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Create circular clipping path
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Draw the image centered and cropped to circle
      ctx.drawImage(
        img,
        (img.width - size) / 2,
        (img.height - size) / 2,
        size,
        size,
        0,
        0,
        size,
        size
      );

      // Return the data URL
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = imageUrl;
  });
}

/**
 * Creates a circular cropped blob from an image file
 * @param imgFile - File object of the image
 * @returns Promise<Blob> - Cropped image as PNG blob
 */
export async function cropFileToCircle(imgFile: File): Promise<Blob> {
  const img = new Image();
  img.src = URL.createObjectURL(imgFile);
  await img.decode();

  const size = Math.min(img.width, img.height);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d')!;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
  
  return await new Promise(resolve => canvas.toBlob(blob => resolve(blob!), "image/png"));
}