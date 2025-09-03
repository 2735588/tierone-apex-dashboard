// Utility functions for badge image processing

type Shape = "circle" | "hex";

/**
 * Crops an image to a specified shape with transparent background
 * @param imgFile - File object of the image
 * @param shape - Shape to crop to ("hex" or "circle")
 * @returns Promise<Blob> - Cropped image as PNG blob with transparency
 */
export async function cropToShape(imgFile: File, shape: Shape = "hex"): Promise<Blob> {
  const url = URL.createObjectURL(imgFile);
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  await img.decode();

  // cover the smallest centered square
  const side = Math.min(img.width, img.height);
  const sx = Math.floor((img.width  - side) / 2);
  const sy = Math.floor((img.height - side) / 2);

  // high-res export for crisp badges
  const EXPORT = 512; // 256/512 depending on your UI needs
  const c = document.createElement("canvas");
  c.width = EXPORT; c.height = EXPORT;
  const ctx = c.getContext("2d")!;

  // transparent background by default (no fill)
  ctx.clearRect(0, 0, EXPORT, EXPORT);

  // build mask path
  ctx.save();
  ctx.beginPath();
  if (shape === "circle") {
    ctx.arc(EXPORT/2, EXPORT/2, EXPORT/2, 0, Math.PI * 2);
  } else {
    // regular hexagon
    const r = EXPORT/2;
    const cx = r, cy = r;
    for (let i = 0; i < 6; i++) {
      const a = Math.PI/3 * i - Math.PI/6; // flat-top hex
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.clip();

  // draw the centered square region into the clipped canvas
  ctx.drawImage(img, sx, sy, side, side, 0, 0, EXPORT, EXPORT);
  ctx.restore();

  // export PNG with transparency
  return await new Promise<Blob>((res) => c.toBlob(b => res(b!), "image/png"));
}

/**
 * Crops an image URL to a hex shape with transparent background
 * @param imageUrl - URL of the image to crop
 * @returns Promise<string> - Data URL of the cropped hex image
 */
export async function cropBadgeToHex(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = async () => {
      try {
        // Convert image to file-like object for cropToShape
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(async (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob from image'));
            return;
          }
          
          const file = new File([blob], 'badge.png', { type: 'image/png' });
          const croppedBlob = await cropToShape(file, "hex");
          
          // Convert blob to data URL
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read cropped image'));
          reader.readAsDataURL(croppedBlob);
        }, 'image/png');
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = imageUrl;
  });
}

// Legacy functions for backward compatibility
export const cropBadgeToCircle = cropBadgeToHex;
export const cropFileToCircle = (file: File) => cropToShape(file, "circle");