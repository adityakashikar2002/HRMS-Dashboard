// EmployeeTree.jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '../UI';
import TreeControls from '../UI/TreeControls';
import { FaUserTie, FaBuilding, FaCaretDown, FaCaretUp, FaSearchPlus, FaSearchMinus, FaUndo } from 'react-icons/fa';

const TreeNode = ({ node = {}, onEmployeeClick = () => {} }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node?.children?.length > 0;

  const getPositionColor = (position, type) => {
    if (type === 'department') return 'bg-gradient-to-br from-teal-400 to-green-400 shadow-md hover:shadow-lg';
    if (!position) return 'bg-gradient-to-br from-gray-400 to-gray-500 shadow-md hover:shadow-lg';
    if (position.includes('President') || position.includes('CEO')) return 'bg-gradient-to-br from-purple-500 to-indigo-500 shadow-md hover:shadow-lg';
    if (position.includes('VP') || position.includes('Director')) return 'bg-gradient-to-br from-blue-400 to-cyan-400 shadow-md hover:shadow-lg';
    if (position.includes('Manager')) return 'bg-gradient-to-br from-lime-400 to-green-500 shadow-md hover:shadow-lg';
    return 'bg-gradient-to-br from-gray-400 to-gray-500 shadow-md hover:shadow-lg';
  };

  return (
    <div className="relative flex flex-col items-center transition duration-300 ease-in-out transform hover:scale-105">
      <div
        className={`group relative p-4 rounded-xl text-white text-center min-w-[180px] shadow-lg cursor-pointer ${getPositionColor(
          node.position,
          node.type
        )}`}
        onClick={() => onEmployeeClick(node.id)}
      >
        {node.type === 'department' ? (
          <div className="w-14 h-14 rounded-full bg-white/30 mx-auto mb-3 flex items-center justify-center">
            <FaBuilding className="text-xl text-white" />
          </div>
        // ) : node.photo ? (
        //   <div className="relative w-14 h-14 rounded-full mx-auto mb-3 overflow-hidden border-2 border-white shadow-inner">
        //     <img
        //       src={node.photo}
        //       alt={node.name}
        //       className="object-cover w-full h-full"
        //     />
        //     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-opacity duration-300"></div>
        //   </div>
        // ) : (
        //   <div className="w-14 h-14 rounded-full bg-white/30 mx-auto mb-3 flex items-center justify-center">
        //     <FaUserTie className="text-xl text-white" />
        //   </div>
      ) : node.photo ? (
          <div className="relative w-14 h-14 rounded-full mx-auto mb-3 overflow-hidden border-2 border-white shadow-inner">
            <img
              src={node.photo}
              alt={node.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-white/30 mx-auto mb-3 flex items-center justify-center">
            <FaUserTie className="text-xl text-white" />
          </div>
        )}
        <h3 className="font-semibold text-sm truncate">{node.type === 'department' ? node.name : node.name}</h3>
        <p className="text-xs opacity-70 truncate">
          {node.type === 'department' ? 'Department' : node.position || 'N/A'}
        </p>
        {node.phone && <p className="text-[10px] mt-1 opacity-80">{node.phone}</p>}
        {node.email && <p className="text-[10px] opacity-80 truncate">{node.email}</p>}
      </div>

      {hasChildren && (
        <div className="relative mt-2">
          <div className={`w-0 h-6 border-l-2 border-dashed border-gray-400 absolute top-[-2px] left-1/2 transform -translate-x-1/2 z-0 ${isExpanded ? '' : 'bottom-0'}`}></div>
          <Button
            variant="ghost"
            size="xs"
            className="text-gray-600 hover:text-black transition-colors duration-200 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded((prev) => !prev);
            }}
          >
            {isExpanded ? <FaCaretUp /> : <FaCaretDown />}
          </Button>
        </div>
      )}

      {hasChildren && isExpanded && (
        <div className="flex flex-row items-start mt-4 space-x-8 relative before:content-[''] before:absolute before:top-[-10px] before:left-1/2 before:-translate-x-1/2 before:w-full before:h-[2px] before:bg-gray-300 before:z-[-1]">
          {node.children.map((child) => (
            <div className="flex flex-col items-center" key={child.id}>
              <TreeNode node={child} onEmployeeClick={onEmployeeClick} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EmployeeTree = ({ treeData = [], onEmployeeClick = () => {} }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const treeRef = useRef(null);
  const containerRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleZoom = useCallback((direction) => {
    setScale((prev) => {
      const newScale = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.min(Math.max(newScale, 0.6), 2);
    });
  }, []);

  const handleResetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 20 });
  }, []);

  const handlePanStart = useCallback(
    (e) => {
      if (e.button !== 0) return;
      const startPos = { x: e.clientX, y: e.clientY };
      const startTransform = { ...position };
      document.body.classList.add('cursor-grab');

      const handlePanMove = (moveEvent) => {
        const dx = moveEvent.clientX - startPos.x;
        const dy = moveEvent.clientY - startPos.y;
        setPosition({ x: startTransform.x + dx, y: startTransform.y + dy });
      };

      const handlePanEnd = () => {
        document.removeEventListener('mousemove', handlePanMove);
        document.removeEventListener('mouseup', handlePanEnd);
        document.body.classList.remove('cursor-grab');
      };

      document.addEventListener('mousemove', handlePanMove);
      document.addEventListener('mouseup', handlePanEnd);
    },
    [position]
  );

  useEffect(() => {
    if (!isInitialized && treeRef.current && containerRef.current) {
      const treeWidth = treeRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      setPosition({ x: (containerWidth - treeWidth) / 2, y: 20 });
      setIsInitialized(true);
    }
  }, [isInitialized, treeData]);

  return (
    <div className="relative h-[85vh] overflow-hidden bg-gray-100 rounded-xl shadow-lg">
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-xl font-semibold text-gray-800">Organizational Chart</h2>
      </div>
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button onClick={() => handleZoom('in')} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition-colors duration-200">
          <FaSearchPlus />
        </Button>
        <Button onClick={() => handleZoom('out')} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition-colors duration-200">
          <FaSearchMinus />
        </Button>
        <Button onClick={handleResetView} size="sm" className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md shadow-sm transition-colors duration-200">
          <FaUndo />
        </Button>
      </div>
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-auto cursor-grab active:cursor-grabbing"
        onMouseDown={handlePanStart}
      >
        <div
          ref={treeRef}
          className="transition-transform duration-500 ease-out flex justify-center origin-top-left"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <div className="pt-10 pb-20 flex flex-col items-center space-y-8">
            {treeData.map((node) => (
              <TreeNode key={node.id} node={node} onEmployeeClick={onEmployeeClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTree;