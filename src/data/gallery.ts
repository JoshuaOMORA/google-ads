import galleryManifest from './gallery-manifest.json';

const manifest = galleryManifest as Record<string, string[]>;

export function getGalleryImages(puppyName: string, primaryImage: string): string[] {
  const folderImages = manifest[puppyName] ?? [];
  const filtered = folderImages.filter((img) => img !== primaryImage);
  return [primaryImage, ...filtered].slice(0, 3);
}
