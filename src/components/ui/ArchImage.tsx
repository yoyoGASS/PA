interface ArchImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ArchImage({ src, alt, className = '' }: ArchImageProps) {
  return (
    <div className={`arch-mask ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
