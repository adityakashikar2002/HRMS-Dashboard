// import React from 'react';

// const TeamCard = ({ team, onClick, onDelete }) => {
//   return (
//     <div className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
//       <div className="flex justify-between items-start mb-2">
//         <h3 
//           className="text-lg font-semibold text-white truncate cursor-pointer hover:text-blue-400"
//           onClick={() => onClick(team.id)}
//         >
//           {team.name}
//         </h3>
//         <button 
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete(team.id);
//           }}
//           className="text-red-500 hover:text-red-400"
//         >
//           <i className="fas fa-trash"></i>
//         </button>
//       </div>
      
//       <p className="text-gray-400 text-sm mb-4 line-clamp-2">{team.description}</p>
      
//       <div className="flex items-center">
//         <div className="flex -space-x-2">
//           {team.members.slice(0, 3).map((member, index) => (
//             <img 
//               key={index}
//               src={member.avatar} 
//               alt={member.name}
//               className="w-8 h-8 rounded-full border-2 border-gray-700"
//             />
//           ))}
//           {team.members.length > 3 && (
//             <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-700 flex items-center justify-center text-xs">
//               +{team.members.length - 3}
//             </div>
//           )}
//         </div>
//         <span className="ml-2 text-xs text-gray-400">
//           {team.members.length} member{team.members.length !== 1 ? 's' : ''}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default TeamCard;




// TeamCard.jsx
import React from 'react';

const TeamCard = ({ team, onClick, onDelete }) => {

  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      
      <div className="flex justify-between items-start mb-2">
        <h3 
          className="text-lg font-semibold text-gray-800 truncate cursor-pointer hover:text-blue-600"
          onClick={() => onClick(team.id)}
        >
          {team.name}
        </h3>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(team.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{team.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {team.members.slice(0, 3).map((member, index) => (
              <img 
                key={index}
                src={member.avatar} 
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
            {team.members.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-700">
                +{team.members.length - 3}
              </div>
            )}
          </div>
          <span className="ml-2 text-xs text-gray-600">
            {team.members.length} member{team.members.length !== 1 ? 's' : ''}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          Created: {new Date(team.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default TeamCard;