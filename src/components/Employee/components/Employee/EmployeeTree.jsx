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



// // src/components/Employee/EmployeeTree.jsx
// import { useState, useRef, useEffect, useCallback } from 'react';
// import { Button } from '../UI';
// import TreeControls from '../UI/TreeControls';

// const DepartmentNode = ({ 
//   department, 
//   onEmployeeClick,
//   onDepartmentClick,
//   expandedDepartments,
//   toggleExpand 
// }) => {
//   const isExpanded = expandedDepartments.includes(department.id);
//   const hasChildren = department.children && department.children.length > 0;

//   const getDepartmentColor = (name) => {
//     const colors = {
//       'Executive': 'from-purple-600 to-indigo-600',
//       'Human Resources': 'from-pink-600 to-rose-600',
//       'Sales': 'from-blue-600 to-cyan-500',
//       'Engineering': 'from-green-600 to-emerald-500',
//       'default': 'from-gray-600 to-gray-500'
//     };
//     return colors[name] || colors.default;
//   };

//   return (
//     <div className="flex flex-col items-center relative">
//       {/* Department Card */}
//       <div
//         className={`p-4 rounded-xl text-white text-center min-w-[200px] shadow-lg cursor-pointer
//           bg-gradient-to-r ${getDepartmentColor(department.name)}`}
//         onClick={() => onDepartmentClick(department.id)}
//       >
//         <h3 className="font-bold text-sm">{department.name}</h3>
//         {department.headPosition && (
//           <p className="text-xs mt-1">{department.headPosition.title}</p>
//         )}
//         {department.headEmployee && (
//           <p className="text-xs">
//             {department.headEmployee.firstName} {department.headEmployee.lastName}
//           </p>
//         )}
//       </div>

//       {/* Expand/Collapse Button */}
//       {hasChildren && (
//         <Button
//           variant="ghost"
//           size="sm"
//           className="text-xs mt-1 text-gray-700 hover:text-black"
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleExpand(department.id);
//           }}
//         >
//           {isExpanded ? 'Collapse' : 'Expand'}
//         </Button>
//       )}

//       {/* Children */}
//       {isExpanded && hasChildren && (
//         <>
//           <div className="w-0 h-5 border-l-2 border-gray-400"></div>
//           <div className="flex flex-row items-start space-x-6 mt-2">
//             {department.children.map((child) => (
//               <div key={child.id} className="flex flex-col items-center">
//                 {child.type === 'department' ? (
//                   <DepartmentNode
//                     department={child}
//                     onEmployeeClick={onEmployeeClick}
//                     onDepartmentClick={onDepartmentClick}
//                     expandedDepartments={expandedDepartments}
//                     toggleExpand={toggleExpand}
//                   />
//                 ) : (
//                   <PositionNode 
//                     position={child} 
//                     onEmployeeClick={onEmployeeClick}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const PositionNode = ({ position, onEmployeeClick }) => {
//   const hasEmployees = position.employees && position.employees.length > 0;

//   const getPositionColor = (level) => {
//     const colors = {
//       'C-Level': 'from-purple-600 to-indigo-600',
//       'Director': 'from-blue-600 to-cyan-500',
//       'Manager': 'from-green-600 to-teal-500',
//       'Senior': 'from-yellow-500 to-amber-500',
//       'default': 'from-gray-600 to-gray-500'
//     };
//     return colors[level] || colors.default;
//   };

//   return (
//     <div className="flex flex-col items-center relative">
//       {/* Position Card */}
//       <div
//         className={`p-3 rounded-lg text-white text-center min-w-[180px] shadow-md
//           bg-gradient-to-r ${getPositionColor(position.level)}`}
//       >
//         <h3 className="font-bold text-xs">{position.name}</h3>
//         <p className="text-[10px] mt-1">{position.level}</p>
//       </div>

//       {/* Employees */}
//       {hasEmployees && (
//         <>
//           <div className="w-0 h-5 border-l-2 border-gray-400"></div>
//           <div className="flex flex-row items-start space-x-4 mt-2">
//             {position.employees.map(employee => (
//               <div key={employee.id} className="flex flex-col items-center">
//                 <EmployeeNode 
//                   employee={employee} 
//                   onClick={onEmployeeClick}
//                 />
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const EmployeeNode = ({ employee, onClick }) => {
//   return (
//     <div 
//       className="p-2 rounded-md bg-white shadow-sm text-center min-w-[120px] cursor-pointer
//         hover:shadow-md transition-shadow"
//       onClick={() => onClick(employee.id)}
//     >
//       {employee.photo ? (
//         <img 
//           src={employee.photo} 
//           alt={employee.name} 
//           className="w-10 h-10 rounded-full mx-auto mb-1 object-cover border-2 border-white"
//         />
//       ) : (
//         <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto mb-1 flex items-center justify-center">
//           <span className="text-xs font-semibold">
//             {employee.firstName?.charAt(0)}{employee.lastName?.charAt(0)}
//           </span>
//         </div>
//       )}
//       <h3 className="font-bold text-xs">{employee.firstName} {employee.lastName}</h3>
//       <p className="text-[10px] text-gray-600">{employee.position}</p>
//     </div>
//   );
// };

// const EmployeeTree = ({ 
//   treeData = [], 
//   onEmployeeClick = () => {},
//   onDepartmentClick = () => {} 
// }) => {
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [expandedDepartments, setExpandedDepartments] = useState([]);
//   const treeRef = useRef(null);
//   const containerRef = useRef(null);

//   const handleZoom = useCallback((direction) => {
//     setScale((prev) => {
//       const newScale = direction === 'in' ? prev * 1.2 : prev / 1.2;
//       return Math.min(Math.max(newScale, 0.5), 3);
//     });
//   }, []);

//   const handleResetView = useCallback(() => {
//     setScale(1);
//     setPosition({ x: 0, y: 0 });
//     // Expand all top-level departments by default
//     setExpandedDepartments(treeData.map(dept => dept.id));
//   }, [treeData]);

//   const toggleExpand = (departmentId) => {
//     setExpandedDepartments(prev => 
//       prev.includes(departmentId)
//         ? prev.filter(id => id !== departmentId)
//         : [...prev, departmentId]
//     );
//   };

//   const handlePanStart = useCallback(
//     (e) => {
//       if (e.button !== 0) return;
//       const startPos = { x: e.clientX, y: e.clientY };
//       const startTransform = { ...position };

//       const handlePanMove = (moveEvent) => {
//         const dx = moveEvent.clientX - startPos.x;
//         const dy = moveEvent.clientY - startPos.y;
//         setPosition({ x: startTransform.x + dx, y: startTransform.y + dy });
//       };

//       const handlePanEnd = () => {
//         document.removeEventListener('mousemove', handlePanMove);
//         document.removeEventListener('mouseup', handlePanEnd);
//       };

//       document.addEventListener('mousemove', handlePanMove);
//       document.addEventListener('mouseup', handlePanEnd);
//     },
//     [position]
//   );

//   useEffect(() => {
//     if (treeData.length > 0 && expandedDepartments.length === 0) {
//       // Expand all top-level departments by default
//       setExpandedDepartments(treeData.map(dept => dept.id));
//     }
//   }, [treeData]);

//   return (
//     <div className="relative h-[80vh] overflow-hidden bg-gray-50 rounded-xl">
//       <div
//         ref={containerRef}
//         className="absolute inset-0 overflow-auto"
//         onMouseDown={handlePanStart}
//       >
//         <div
//           ref={treeRef}
//           className="transition-transform duration-300 w-full flex justify-center"
//           style={{
//             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
//             transformOrigin: 'top left',
//             padding: '2rem'
//           }}
//         >
//           <div className="flex flex-col items-center space-y-8">
//             {treeData.map((department) => (
//               <DepartmentNode
//                 key={department.id}
//                 department={department}
//                 onEmployeeClick={onEmployeeClick}
//                 onDepartmentClick={onDepartmentClick}
//                 expandedDepartments={expandedDepartments}
//                 toggleExpand={toggleExpand}
//               />
//             ))}
//           </div>
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