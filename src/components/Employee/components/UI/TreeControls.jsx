import { ZoomIn, ZoomOut, Maximize } from 'react-feather';

const TreeControls = ({ scale, onZoomIn, onZoomOut, onResetView }) => {
  return (
    <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2">
      <button 
        onClick={onZoomOut}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="text-gray-700" size={18} />
      </button>
      <span className="text-sm font-medium text-gray-700">
        {Math.round(scale * 100)}%
      </span>
      <button 
        onClick={onZoomIn}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="text-gray-700" size={18} />
      </button>
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button 
        onClick={onResetView}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Reset View"
      >
        <Maximize className="text-gray-700" size={18} />
      </button>
    </div>
  );
};

export default TreeControls;