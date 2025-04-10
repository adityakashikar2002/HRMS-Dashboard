// components/EmployeeTree.jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '../UI';
import TreeControls from '../UI/TreeControls';

const TreeNode = ({ node = {}, onEmployeeClick = () => {} }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node?.children?.length > 0;

  const getPositionColor = (position) => {
    if (position.includes('President') || position.includes('CEO')) return 'bg-gradient-to-r from-purple-600 to-indigo-600';
    if (position.includes('VP') || position.includes('Director')) return 'bg-gradient-to-r from-blue-600 to-cyan-500';
    if (position.includes('Manager')) return 'bg-gradient-to-r from-green-600 to-teal-500';
    return 'bg-gradient-to-r from-gray-600 to-gray-500';
  };

  return (
    <div className="flex flex-col items-center relative tree-node">
      <div
        className={`p-4 rounded-xl text-white text-center min-w-[150px] shadow-lg ${getPositionColor(
          node.position || ''
        )}`}
        onClick={() => onEmployeeClick(node.id)}
      >
        {node.photo ? (
          <img 
            src={node.photo} 
            alt={node.name} 
            className="w-12 h-12 rounded-full mx-auto mb-2 object-cover border-2 border-white"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-white/20 mx-auto mb-2 flex items-center justify-center">
            <span className="text-lg font-semibold">
              {node.name?.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
        <h3 className="font-bold text-sm">{node.position}</h3>
        <p className="text-xs">{node.name}</p>
        <p className="text-[10px] mt-1">{node.phone}</p>
        <p className="text-[10px]">{node.email}</p>
      </div>

      {hasChildren && isExpanded && (
        <div className="w-0 h-5 border-l-2 border-gray-400 tree-connector"></div>
      )}
      {hasChildren && isExpanded && (
        <div className="flex flex-row items-start space-x-6 mt-2 relative tree-connector-horizontal">
          {node.children.map((child) => (
            <div className="flex flex-col items-center" key={child.id}>
              <TreeNode node={child} onEmployeeClick={onEmployeeClick} />
            </div>
          ))}
        </div>
      )}

      {hasChildren && (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs mt-1 text-gray-700 hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded((prev) => !prev);
          }}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      )}
    </div>
  );
};

const EmployeeTree = ({ treeData = [], onEmployeeClick = () => {} }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const treeRef = useRef(null);
  const containerRef = useRef(null);

  const handleZoom = useCallback((direction) => {
    setScale((prev) => {
      const newScale = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.min(Math.max(newScale, 0.5), 3);
    });
  }, []);

  const handleResetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handlePanStart = useCallback(
    (e) => {
      if (e.button !== 0) return;
      const startPos = { x: e.clientX, y: e.clientY };
      const startTransform = { ...position };

      const handlePanMove = (moveEvent) => {
        const dx = moveEvent.clientX - startPos.x;
        const dy = moveEvent.clientY - startPos.y;
        setPosition({ x: startTransform.x + dx, y: startTransform.y + dy });
      };

      const handlePanEnd = () => {
        document.removeEventListener('mousemove', handlePanMove);
        document.removeEventListener('mouseup', handlePanEnd);
      };

      document.addEventListener('mousemove', handlePanMove);
      document.addEventListener('mouseup', handlePanEnd);
    },
    [position]
  );

  useEffect(() => {
    if (treeRef.current && containerRef.current) {
      const treeWidth = treeRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      setPosition({ x: (containerWidth - treeWidth) / 2, y: 20 });
    }
  }, [treeData]);

  return (
    <div className="relative h-[80vh] overflow-hidden bg-gray-50 rounded-xl">
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-auto"
        onMouseDown={handlePanStart}
      >
        <div
          ref={treeRef}
          className="transition-transform duration-300 w-full flex justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div className="flex flex-col items-center space-y-4">
            {treeData.map((node) => (
              <TreeNode key={node.id} node={node} onEmployeeClick={onEmployeeClick} />
            ))}
          </div>
        </div>
      </div>

      <TreeControls
        scale={scale}
        onZoomIn={() => handleZoom('in')}
        onZoomOut={() => handleZoom('out')}
        onResetView={handleResetView}
      />
    </div>
  );
};

export default EmployeeTree;