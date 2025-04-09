// import { useState } from 'react';
// import Button from '../UI/Button';

// const TreeNode = ({ node, level = 0, onEmployeeClick }) => {
//   const [isExpanded, setIsExpanded] = useState(level < 2);

//   return (
//     <div className="ml-4 my-2">
//       <div 
//         className={`flex items-center p-3 rounded-lg ${level === 0 ? 'bg-blue-100' : level === 1 ? 'bg-purple-100' : 'bg-gray-100'}`}
//         onClick={() => onEmployeeClick(node.id)}
//       >
//         <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
//           <span className="text-gray-600 font-semibold">{node.name.charAt(0)}</span>
//         </div>
//         <div className="flex-1">
//           <h3 className="font-semibold text-gray-800">{node.name}</h3>
//           <p className="text-sm text-gray-600">{node.position}</p>
//         </div>
//         {node.children && node.children.length > 0 && (
//           <Button 
//             variant="text" 
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsExpanded(!isExpanded);
//             }}
//           >
//             {isExpanded ? 'Collapse' : 'Expand'}
//           </Button>
//         )}
//       </div>
//       {isExpanded && node.children && (
//         <div className="border-l-2 border-gray-200 ml-6 pl-2">
//           {node.children.map(childNode => (
//             <TreeNode 
//               key={childNode.id} 
//               node={childNode} 
//               level={level + 1} 
//               onEmployeeClick={onEmployeeClick} 
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const EmployeeTree = ({ treeData, onEmployeeClick }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-xl font-semibold mb-6 text-gray-800">Organization Structure</h2>
//       {treeData.map(node => (
//         <TreeNode 
//           key={node.id} 
//           node={node} 
//           onEmployeeClick={onEmployeeClick} 
//         />
//       ))}
//     </div>
//   );
// };

// export default EmployeeTree;

// import { useCallback, useEffect, useRef, useState } from 'react';
// import { Button } from '../UI';
// import TreeControls from '../UI/TreeControls';
// import { ZoomIn, ZoomOut, Maximize, Minimize } from 'react-feather';

// const TreeNode = ({ node, level = 0, onEmployeeClick }) => {
//   const [isExpanded, setIsExpanded] = useState(level < 2);
//   const hasChildren = node.children && node.children.length > 0;

//   const positionColors = {
//     'CEO': 'from-purple-600 to-indigo-600',
//     'Manager': 'from-blue-600 to-cyan-500',
//     'Director': 'from-green-600 to-teal-500',
//     'Engineer': 'from-yellow-500 to-amber-500',
//     'Specialist': 'from-pink-500 to-rose-500',
//     'default': 'from-gray-600 to-gray-500'
//   };

//   const getPositionColor = (position) => {
//     const key = Object.keys(positionColors).find(key => 
//       position.toLowerCase().includes(key.toLowerCase())
//     );
//     return key ? positionColors[key] : positionColors.default;
//   };

//   return (
//     <div className="ml-4 my-2">
//       <div 
//         className={`flex items-center p-3 rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer ${getPositionColor(node.position)} bg-gradient-to-r`}
//         onClick={() => onEmployeeClick(node.id)}
//       >
//         <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-3 backdrop-blur-sm">
//           <span className="text-white font-bold text-lg">{node.name.charAt(0)}</span>
//         </div>
//         <div className="flex-1 text-white">
//           <h3 className="font-bold">{node.name}</h3>
//           <p className="text-sm opacity-90">{node.position}</p>
//         </div>
//         {hasChildren && (
//           <Button 
//             variant="ghost"
//             size="sm"
//             className="text-white/80 hover:text-white"
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsExpanded(!isExpanded);
//             }}
//             icon={isExpanded ? 'chevron-down' : 'chevron-right'}
//           />
//         )}
//       </div>
//       {isExpanded && hasChildren && (
//         <div className="border-l-2 border-gray-200/30 ml-6 pl-2">
//           {node.children.map(childNode => (
//             <TreeNode 
//               key={childNode.id} 
//               node={childNode} 
//               level={level + 1} 
//               onEmployeeClick={onEmployeeClick} 
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const EmployeeTree = ({ treeData, onEmployeeClick }) => {
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const treeRef = useRef(null);
//   const containerRef = useRef(null);

//   const handleZoom = useCallback((direction) => {
//     setScale(prev => {
//       const newScale = direction === 'in' ? prev * 1.2 : prev / 1.2;
//       return Math.min(Math.max(newScale, 0.5), 3);
//     });
//   }, []);

//   const handleResetView = useCallback(() => {
//     setScale(1);
//     setPosition({ x: 0, y: 0 });
//   }, []);

//   const handlePanStart = useCallback((e) => {
//     if (e.button !== 0) return; // Only left mouse button
//     const startPos = { x: e.clientX, y: e.clientY };
//     const startTransform = { ...position };

//     const handlePanMove = (moveEvent) => {
//       const dx = moveEvent.clientX - startPos.x;
//       const dy = moveEvent.clientY - startPos.y;
//       setPosition({
//         x: startTransform.x + dx,
//         y: startTransform.y + dy
//       });
//     };

//     const handlePanEnd = () => {
//       document.removeEventListener('mousemove', handlePanMove);
//       document.removeEventListener('mouseup', handlePanEnd);
//     };

//     document.addEventListener('mousemove', handlePanMove);
//     document.addEventListener('mouseup', handlePanEnd);
//   }, [position]);

//   // Center tree on load
//   useEffect(() => {
//     if (treeRef.current && containerRef.current) {
//       const treeWidth = treeRef.current.scrollWidth;
//       const containerWidth = containerRef.current.clientWidth;
//       setPosition({ x: (containerWidth - treeWidth) / 2, y: 20 });
//     }
//   }, [treeData]);

//   return (
//     <div className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
//       <div 
//         ref={containerRef}
//         className="absolute inset-0 overflow-auto"
//         onMouseDown={handlePanStart}
//       >
//         <div 
//           ref={treeRef}
//           className="p-8 transition-transform duration-300"
//           style={{
//             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
//             transformOrigin: 'top left'
//           }}
//         >
//           {treeData.map(node => (
//             <TreeNode 
//               key={node.id} 
//               node={node} 
//               onEmployeeClick={onEmployeeClick} 
//             />
//           ))}
//         </div>
//       </div>

//       <TreeControls
//         scale={scale}
//         onZoomIn={() => handleZoom('in')}
//         onZoomOut={() => handleZoom('out')}
//         onResetView={handleResetView}
//       />
//     </div>
//   );
// };

// export default EmployeeTree;


import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../UI';
import TreeControls from '../UI/TreeControls';
import { ZoomIn, ZoomOut, Maximize } from 'react-feather';

const TreeNode = ({ node = {}, level = 0, onEmployeeClick = () => {} }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  
  // Safely handle node properties
  const hasChildren = node?.children?.length > 0;
  const nodeName = node?.name || '';
  const nodePosition = node?.position || '';
  const nodeId = node?.id || '';

  const positionColors = {
    'CEO': 'from-purple-600 to-indigo-600',
    'Manager': 'from-blue-600 to-cyan-500',
    'Director': 'from-green-600 to-teal-500',
    'Engineer': 'from-yellow-500 to-amber-500',
    'Specialist': 'from-pink-500 to-rose-500',
    'default': 'from-gray-600 to-gray-500'
  };

  const getPositionColor = (position = '') => {
    if (!position) return positionColors.default;
    const key = Object.keys(positionColors).find(key => 
      position.toLowerCase().includes(key.toLowerCase())
    );
    return key ? positionColors[key] : positionColors.default;
  };

  return (
    <div className="ml-4 my-2">
      <div 
        className={`flex items-center p-3 rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer ${getPositionColor(nodePosition)} bg-gradient-to-r`}
        onClick={() => nodeId && onEmployeeClick(nodeId)}
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-3 backdrop-blur-sm">
          <span className="text-white font-bold text-lg">
            {nodeName.charAt(0) || '?'}
          </span>
        </div>
        <div className="flex-1 text-white">
          <h3 className="font-bold">{nodeName}</h3>
          <p className="text-sm opacity-90">{nodePosition}</p>
        </div>
        {hasChildren && (
          <Button 
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            icon={isExpanded ? 'chevron-down' : 'chevron-right'}
          />
        )}
      </div>
      {isExpanded && hasChildren && (
        <div className="border-l-2 border-gray-200/30 ml-6 pl-2">
          {node.children.map((childNode, index) => (
            <TreeNode 
              key={childNode?.id || `child-${index}`} 
              node={childNode || {}} 
              level={level + 1} 
              onEmployeeClick={onEmployeeClick} 
            />
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

  const handleZoom = useCallback((direction) => {
    setScale(prev => {
      const newScale = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.min(Math.max(newScale, 0.5), 3);
    });
  }, []);

  const handleResetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handlePanStart = useCallback((e) => {
    if (e.button !== 0) return;
    const startPos = { x: e.clientX, y: e.clientY };
    const startTransform = { ...position };

    const handlePanMove = (moveEvent) => {
      const dx = moveEvent.clientX - startPos.x;
      const dy = moveEvent.clientY - startPos.y;
      setPosition({
        x: startTransform.x + dx,
        y: startTransform.y + dy
      });
    };

    const handlePanEnd = () => {
      document.removeEventListener('mousemove', handlePanMove);
      document.removeEventListener('mouseup', handlePanEnd);
    };

    document.addEventListener('mousemove', handlePanMove);
    document.addEventListener('mouseup', handlePanEnd);
  }, [position]);

  useEffect(() => {
    if (treeRef.current && containerRef.current) {
      const treeWidth = treeRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      setPosition({ x: (containerWidth - treeWidth) / 2, y: 20 });
    }
  }, [treeData]);

  return (
    <div className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-auto"
        onMouseDown={handlePanStart}
      >
        <div 
          ref={treeRef}
          className="p-8 transition-transform duration-300"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'top left'
          }}
        >
          {treeData.map((node, index) => (
            <TreeNode 
              key={node?.id || `node-${index}`} 
              node={node || {}} 
              onEmployeeClick={onEmployeeClick} 
            />
          ))}
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