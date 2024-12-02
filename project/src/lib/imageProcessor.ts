export interface Prediction {
  className: string;
  probability: number;
}

export function createImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const imageUrl = URL.createObjectURL(file);

    const cleanup = () => URL.revokeObjectURL(imageUrl);

    img.onload = () => {
      resolve(img);
      cleanup();
    };

    img.onerror = () => {
      cleanup();
      reject(new Error('Failed to load image. Please try a different file.'));
    };

    img.src = imageUrl;
  });
}

export function validateImageFile(file: File): void {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload an image file (JPEG, PNG, etc.)');
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_SIZE) {
    throw new Error('Image size must be less than 10MB');
  }
}