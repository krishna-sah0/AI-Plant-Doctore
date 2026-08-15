import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { BotanicalSpecimenArt } from '../botanicalArt';

interface PlantImageProps {
  src?: string | null;
  alt: string;
  specimenId?: string;
  className?: string;
  containerClassName?: string;
  fallbackIconSize?: string;
  aspectRatio?: string;
}

export const PlantImage: React.FC<PlantImageProps> = ({
  src,
  alt,
  specimenId,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  fallbackIconSize = 'w-6 h-6',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  // If there is an error or no src, render accurate bespoke botanical artwork matching description
  if (!src || hasError) {
    if (specimenId) {
      return (
        <div className={`relative overflow-hidden ${containerClassName || 'w-full h-full'}`}>
          <BotanicalSpecimenArt type={specimenId} className={className} />
        </div>
      );
    }

    return (
      <div
        className={`bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950/80 flex flex-col items-center justify-center text-emerald-500/70 p-2 select-none ${className} ${containerClassName}`}
        title={alt}
      >
        <div className="p-2 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-emerald-400">
          <Leaf className={fallbackIconSize} />
        </div>
        <span className="text-[10px] text-stone-400 mt-1 font-medium text-center line-clamp-1 max-w-[90%]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-950 ${containerClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 z-0">
          {specimenId ? (
            <BotanicalSpecimenArt type={specimenId} className="w-full h-full opacity-60" />
          ) : (
            <div className="w-full h-full bg-stone-900 animate-pulse flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-800 animate-bounce" />
            </div>
          )}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`relative z-10 ${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
};

