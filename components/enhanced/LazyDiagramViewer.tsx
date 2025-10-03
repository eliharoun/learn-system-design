import React, { useState, useEffect, useRef } from 'react';
import { Loader2, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

interface LazyDiagramViewerProps {
  diagramId: string;
  title: string;
  className?: string;
  showControls?: boolean;
  autoLoad?: boolean;
}

export const LazyDiagramViewer: React.FC<LazyDiagramViewerProps> = ({
  diagramId,
  title,
  className = '',
  showControls = true,
  autoLoad = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Use the diagram ID directly for PNG files
  const pngPath = `/diagrams/${diagramId}.png`;

  useEffect(() => {
    if (autoLoad) {
      loadDiagram();
    }
  }, [autoLoad]);

  const loadDiagram = async () => {
    if (isLoaded || isLoading) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Load PNG directly
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
        setIsLoading(false);
      };
      img.onerror = () => {
        setError('Failed to load diagram');
        setIsLoading(false);
      };
      img.src = pngPath;
    } catch (err) {
      setError('Failed to load diagram');
      setIsLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleImageClick = () => {
    if (!isLoaded && !isLoading) {
      loadDiagram();
    }
  };

  if (error) {
    return (
      <div className={`bg-gray-800 rounded-lg border border-gray-700 p-8 text-center ${className}`}>
        <div className="text-red-400 mb-2">Failed to load diagram</div>
        <div className="text-gray-400 text-sm">{title}</div>
        <button
          onClick={loadDiagram}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div 
        ref={containerRef}
        className={`relative bg-gray-800 rounded-lg border border-gray-700 overflow-hidden ${className}`}
      >
        {/* Loading State */}
        {!isLoaded && (
          <div 
            className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-750 transition-colors"
            onClick={handleImageClick}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-4" />
                <div className="text-gray-300 mb-2">Loading diagram...</div>
              </>
            ) : (
              <div className="text-gray-300 mb-2">Click to load diagram</div>
            )}
            <div className="text-gray-400 text-sm text-center">{title}</div>
          </div>
        )}

        {/* Loaded Diagram */}
        {isLoaded && (
          <div className="relative">
            <div className="overflow-auto max-h-96">
              <img
                ref={imageRef}
                src={pngPath}
                alt={title}
                className="w-full h-auto transition-transform duration-200"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
            
            {/* Controls */}
            {showControls && (
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4 text-white" />
                </button>
              </div>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg">
              <div className="text-white text-sm font-medium">{title}</div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-full max-h-full">
            <img
              src={pngPath}
              alt={title}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
            >
              <Maximize2 className="w-6 h-6 text-white" />
            </button>
            <div className="absolute bottom-4 left-4 bg-black/50 px-4 py-2 rounded-lg">
              <div className="text-white font-medium">{title}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
