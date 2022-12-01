import imageSize from 'image-size';

export interface ImageSize {
  type?: string;
  width?: number;
  height?: number;
}

export default function getImageSize(file: string) {
  return new Promise<ImageSize>((resolve) =>
    imageSize(file, (err, size) => {
      if (err) console.warn('getImageSize', err);
      resolve(size ? size : {});
    }),
  );
}
