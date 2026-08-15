import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Camera, RefreshCw, CheckCircle2, X, Sparkles } from 'lucide-react';
import { PlantImage } from './PlantImage';

interface ImageUploaderProps {
  onImageChange: (file: File | null, customUrl?: string) => void;
  previewUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setCameraError('Unable to access device camera. Please upload an image file instead.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraActive]);

  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `plant-snapshot-${Date.now()}.jpg`, { type: 'image/jpeg' });
          onImageChange(file);
          stopCamera();
        }
      }, 'image/jpeg', 0.92);
    }
  };

  return (
    <div className="space-y-3">
      <input
        id="plant-image-upload"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
      />

      {isCameraActive ? (
        <div className="relative rounded-2xl overflow-hidden border border-emerald-500 bg-stone-950 p-4 text-center">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Viewfinder Overlay Target */}
            <div className="absolute inset-8 border-2 border-emerald-400/70 border-dashed rounded-2xl pointer-events-none flex items-center justify-center">
              <div className="text-center px-4 py-2 bg-stone-900/80 backdrop-blur-sm rounded-lg border border-emerald-500/30">
                <span className="text-[11px] font-semibold text-emerald-300">
                  Align leaf or affected stem inside frame
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={captureSnapshot}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-950/50 active:scale-95 transition-all"
            >
              <Camera className="w-4 h-4" />
              Capture Plant Snapshot
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      ) : previewUrl ? (
        <div className="relative rounded-2xl overflow-hidden border border-emerald-600/40 bg-stone-950/70 p-4 text-center group">
          <div className="max-h-72 w-full overflow-hidden rounded-xl bg-stone-950 flex items-center justify-center border border-stone-800/80">
            <PlantImage
              src={previewUrl}
              alt="Plant specimen for AI analysis"
              className="max-h-72 w-auto object-contain rounded-xl"
              containerClassName="max-h-72 w-full flex items-center justify-center"
              fallbackIconSize="w-8 h-8"
            />
          </div>
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 px-1">
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Specimen Loaded & Ready for Botanical Diagnosis</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openFileDialog}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change Image
              </button>
              <button
                type="button"
                onClick={startCamera}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-300 transition-colors flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                Take Photo
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={openFileDialog}
            className={`relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-emerald-400 bg-emerald-950/60 scale-[1.01]'
                : 'border-stone-700 hover:border-emerald-500/80 bg-stone-950/60 hover:bg-stone-950/90'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h4 className="text-sm font-bold text-white">
              Upload Plant Photo or Drag & Drop Here
            </h4>
            <p className="text-xs text-stone-400 mt-1">
              Supports high-resolution JPEG, PNG, WEBP of leaves, stems, or soil
            </p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-lg">
                Browse Files
              </span>
              <span className="text-xs text-stone-500">or click below to use camera</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={startCamera}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors py-1 px-3 rounded-lg bg-stone-900 border border-stone-800 flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Use Live Device Camera / Webcam</span>
            </button>
          </div>

          {cameraError && (
            <p className="text-xs text-amber-400 text-center bg-amber-950/60 border border-amber-800/60 rounded-xl p-2.5">
              {cameraError}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
