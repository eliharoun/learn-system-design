import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';

interface DiagramViewerProps {
  diagramId: string;
  title: string;
  interactive?: boolean;
  showControls?: boolean;
  className?: string;
  maxWidth?: string;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({
  diagramId,
  title,
  interactive = true,
  showControls = true,
  className = '',
  maxWidth = '100%'
}) => {
  const { trackDiagramView, trackEvent } = useAnalytics();
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Construct diagram paths
  const svgPath = `/diagrams/svg/${diagramId}.svg`;
  const pngPath = `/diagrams/png/${diagramId}.png`;
  const thumbnailPath = `/diagrams/thumbnails/${diagramId}-thumb.png`;

  useEffect(() => {
    // Reset zoom and position when diagram changes
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsLoading(true);
    setError(null);
    
    // Track diagram view
    if (diagramId && title) {
      trackDiagramView(`${diagramId}: ${title}`);
    }
  }, [diagramId, title, trackDiagramView]);

  const handleZoomIn = () => {
    trackEvent('diagram_zoom_in', 'diagram_interaction', diagramId);
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    trackEvent('diagram_zoom_out', 'diagram_interaction', diagramId);
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleReset = () => {
    trackEvent('diagram_reset', 'diagram_interaction', diagramId);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !interactive) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!interactive) return;
    
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError('Failed to load diagram');
  };

  const handleFullscreen = () => {
    trackEvent('diagram_fullscreen', 'diagram_interaction', diagramId);
    // This would open the diagram in a fullscreen modal
    // For now, just log the action
    console.log(`Opening ${title} in fullscreen`);
  };

  return (
    <div className={`diagram-viewer ${className}`} style={{ maxWidth }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        
        {showControls && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              title="Zoom Out"
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              title="Zoom In"
              disabled={zoom >= 3}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleFullscreen}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Diagram Container */}
      <div 
        className="relative overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        style={{ height: '400px' }}
        onWheel={handleWheel}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 mb-2">{error}</p>
              <p className="text-sm text-gray-500">
                Diagram: {diagramId}
              </p>
            </div>
          </div>
        )}

        {!error && (
          <div
            className={`diagram-content ${interactive ? 'cursor-grab' : ''} ${isDragging ? 'cursor-grabbing' : ''}`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Try to load SVG first, fallback to PNG */}
            <img
              src={svgPath}
              alt={title}
              className="max-w-none h-auto"
              onLoad={handleImageLoad}
              onError={() => {
                // Try PNG fallback
                const imgElement = document.querySelector(`img[alt="${title}"]`) as HTMLImageElement;
                if (imgElement && imgElement.src.includes('.svg')) {
                  imgElement.src = pngPath;
                } else {
                  handleImageError();
                }
              }}
              draggable={false}
              style={{
                userSelect: 'none',
                pointerEvents: interactive ? 'none' : 'auto'
              }}
            />
          </div>
        )}

        {/* Instructions overlay for interactive mode */}
        {interactive && !isLoading && !error && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            Scroll to zoom • Drag to pan
          </div>
        )}
      </div>

      {/* Diagram Info */}
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <p>Interactive diagram - Use mouse wheel to zoom, click and drag to pan</p>
      </div>
    </div>
  );
};

export default DiagramViewer;
