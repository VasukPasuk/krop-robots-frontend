export default function getImageSrc(destination: string): string {
  return `${process.env.NEXT_PUBLIC_API_URL}${destination}`
}