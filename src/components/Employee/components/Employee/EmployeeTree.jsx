import { useState } from 'react';
import Button from '../UI/Button';

const TreeNode = ({ node, level = 0, onEmployeeClick }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  return (
    <div className="ml-4 my-2">
      <div 
        className={`flex items-center p-3 rounded-lg ${level === 0 ? 'bg-blue-100' : level === 1 ? 'bg-purple-100' : 'bg-gray-100'}`}
        onClick={() => onEmployeeClick(node.id)}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
          <span className="text-gray-600 font-semibold">{node.name.charAt(0)}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{node.name}</h3>
          <p className="text-sm text-gray-600">{node.position}</p>
        </div>
        {node.children && node.children.length > 0 && (
          <Button 
            variant="text" 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        )}
      </div>
      {isExpanded && node.children && (
        <div className="border-l-2 border-gray-200 ml-6 pl-2">
          {node.children.map(childNode => (
            <TreeNode 
              key={childNode.id} 
              node={childNode} 
              level={level + 1} 
              onEmployeeClick={onEmployeeClick} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const EmployeeTree = ({ treeData, onEmployeeClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Organization Structure</h2>
      {treeData.map(node => (
        <TreeNode 
          key={node.id} 
          node={node} 
          onEmployeeClick={onEmployeeClick} 
        />
      ))}
    </div>
  );
};

export default EmployeeTree;