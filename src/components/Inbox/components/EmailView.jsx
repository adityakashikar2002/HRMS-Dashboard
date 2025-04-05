// // import React from 'react';
// // import { useParams } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faCaretDown, faReply, faPrint, faStar } from '@fortawesome/free-solid-svg-icons';

// // const EmailView = ({ emails, drafts, onBack, onToggleFavorite, onDelete, onMarkAsSpam, onArchive }) => {
// //   const { emailId } = useParams();
// //   // const navigate = useNavigate();
  
// //   // Search in both emails and drafts
// //   const email = [...emails, ...drafts].find(e => e.id === parseInt(emailId));

// //   if (!email) {
// //     return <div>Email not found</div>;
// //   }

// //   return (
// //     <div className="bg-white text-gray-800">
// //       <div className="max-w-4xl mx-auto p-4">
// //         <div className="flex justify-between items-center mb-4">
// //           <button onClick={onBack} className="text-purple-600 hover:text-purple-800">
// //             ← Back
// //           </button>
// //           <div className="flex space-x-2">
// //             {email.label && (
// //               <span className={`${getLabelClass(email.label)} px-2 py-1 rounded-full text-sm`}>
// //                 {email.label}
// //               </span>
// //             )}
// //           </div>
// //         </div>
        
// //         <div className="flex items-start space-x-4">
// //           {email.avatar ? (
// //             <img 
// //               alt={`Profile of ${email.sender}`} 
// //               className="w-12 h-12 rounded-full" 
// //               src={email.avatar}
// //             />
// //           ) : (
// //             <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center">
// //               {email.senderInitials}
// //             </div>
// //           )}
          
// //           <div className="flex-1">
// //             <div className="flex justify-between items-center">
// //               <div>
// //                 <h2 className="font-semibold">{email.sender}</h2>
// //                 <p className="text-gray-500">
// //                   to me
// //                   <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
// //                 </p>
// //               </div>
// //               <div className="text-gray-500 text-sm">
// //                 <FontAwesomeIcon icon={faReply} className="mr-1" />
// //                 <span>{new Date(email.date).toLocaleDateString()}</span>
// //               </div>
// //             </div>
            
// //             <div className="mt-4">
// //               <p className="whitespace-pre-line">{email.body}</p>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="flex justify-end items-center mt-4 space-x-4">
// //           <button onClick={() => window.print()}>
// //             <FontAwesomeIcon icon={faPrint} className="text-gray-500" />
// //           </button>
// //           <button onClick={() => onToggleFavorite([email.id], !email.isFavorite)}>
// //             <FontAwesomeIcon 
// //               icon={faStar} 
// //               className={email.isFavorite ? "text-yellow-500" : "text-gray-500"} 
// //             />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const getLabelClass = (label) => {
// //   switch(label) {
// //     case 'Business': return 'bg-purple-100 text-purple-600';
// //     case 'Management': return 'bg-red-100 text-red-600';
// //     case 'Team': return 'bg-teal-100 text-teal-600';
// //     case 'Mail': return 'bg-yellow-100 text-yellow-600';
// //     default: return 'bg-gray-100 text-gray-600';
// //   }
// // };

// // export default EmailView;


// // // WORKS 99
// // import React, { useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faCaretDown, faReply, faPrint, faStar, faEllipsisV, faPaperclip, faTrash, faArchive, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// // import ComposeEmail from './ComposeEmail'; // Assuming you have a ComposeEmail component

// // const EmailView = ({ emails, drafts, onBack, onToggleFavorite, onDelete, onMarkAsSpam, onArchive, onSendEmail }) => {
// //   const { emailId } = useParams();
// //   const [isReplying, setIsReplying] = useState(false);
// //   const [replyContent, setReplyContent] = useState('');
// //   const [replies, setReplies] = useState([]);
  
// //   // Search in both emails and drafts
// //   const email = [...emails, ...drafts].find(e => e.id === parseInt(emailId));

// //   if (!email) {
// //     return <div className="p-8 text-center text-gray-500">Email not found</div>;
// //   }

// //   const handleReply = () => {
// //     setIsReplying(true);
// //   };

// //   const handleSendReply = () => {
// //     if (replyContent.trim()) {
// //       const newReply = {
// //         id: Date.now(),
// //         sender: 'You',
// //         body: replyContent,
// //         date: new Date().toISOString(),
// //         isReply: true
// //       };
// //       setReplies([...replies, newReply]);
// //       setIsReplying(false);
// //       setReplyContent('');
      
// //       // In a real app, you would call onSendEmail here
// //       // onSendEmail({
// //       //   to: email.sender,
// //       //   subject: `Re: ${email.subject}`,
// //       //   body: replyContent
// //       // });
// //     }
// //   };

// //   const handleCancelReply = () => {
// //     setIsReplying(false);
// //     setReplyContent('');
// //   };

// //   return (
// //     <div className="flex h-screen bg-gray-50">
// //       {/* Left sidebar - can be used for email list or other navigation */}
// //       {/* <div className="w-64 bg-white border-r border-gray-200 hidden md:block"></div> */}
      
// //       {/* Main email content */}
// //       <div className="flex-1 overflow-auto">
// //         <div className="bg-white shadow-sm sticky top-0 z-10 p-4 border-b border-gray-200">
// //           <div className="flex justify-between items-center">
// //             <button 
// //               onClick={onBack} 
// //               className="text-purple-600 hover:text-purple-800 flex items-center"
// //             >
// //               <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //               </svg>
// //               Back
// //             </button>
// //             <div className="flex space-x-2">
// //               <button 
// //                 onClick={() => onArchive([email.id])}
// //                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
// //                 title="Archive"
// //               >
// //                 <FontAwesomeIcon icon={faArchive} />
// //               </button>
// //               <button 
// //                 onClick={() => onMarkAsSpam([email.id])}
// //                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
// //                 title="Report spam"
// //               >
// //                 <FontAwesomeIcon icon={faExclamationTriangle} />
// //               </button>
// //               <button 
// //                 onClick={() => onDelete([email.id])}
// //                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
// //                 title="Delete"
// //               >
// //                 <FontAwesomeIcon icon={faTrash} />
// //               </button>
// //               <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
// //                 <FontAwesomeIcon icon={faEllipsisV} />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="max-w-5xl mx-auto p-6">
// //           {/* Email header */}
// //           <div className="mb-6">
// //             <div className="flex justify-between items-start mb-4">
// //               <h1 className="text-2xl font-semibold text-gray-800">{email.subject}</h1>
// //               <div className="flex space-x-3">
// //                 <button onClick={() => window.print()} className="text-gray-500 hover:text-gray-700" title="Print">
// //                   <FontAwesomeIcon icon={faPrint} />
// //                 </button>
// //                 <button 
// //                   onClick={() => onToggleFavorite([email.id], !email.isFavorite)}
// //                   className={email.isFavorite ? "text-yellow-500" : "text-gray-500 hover:text-gray-700"}
// //                   title="Star"
// //                 >
// //                   <FontAwesomeIcon icon={faStar} />
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="flex items-start space-x-4">
// //               {email.avatar ? (
// //                 <img 
// //                   alt={`Profile of ${email.sender}`} 
// //                   className="w-10 h-10 rounded-full" 
// //                   src={email.avatar}
// //                 />
// //               ) : (
// //                 <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
// //                   {email.senderInitials}
// //                 </div>
// //               )}
              
// //               <div className="flex-1">
// //                 <div className="flex justify-between items-start">
// //                   <div>
// //                     <div className="flex items-center space-x-2">
// //                       <h2 className="font-semibold text-gray-900">{email.sender}</h2>
// //                       {email.label && (
// //                         <span className={`${getLabelClass(email.label)} px-2 py-0.5 rounded-full text-xs`}>
// //                           {email.label}
// //                         </span>
// //                       )}
// //                     </div>
// //                     <p className="text-gray-500 text-sm">
// //                       to me
// //                       <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
// //                     </p>
// //                   </div>
// //                   <div className="text-gray-500 text-sm">
// //                     {new Date(email.date).toLocaleString()}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Email body */}
// //           <div className="prose max-w-none mb-8 p-4 bg-white rounded-lg border border-gray-200">
// //             <p className="whitespace-pre-line text-gray-800">{email.body}</p>
            
// //             {email.attachments && email.attachments.length > 0 && (
// //               <div className="mt-6 pt-4 border-t border-gray-200">
// //                 <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
// //                   <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
// //                   Attachments ({email.attachments.length})
// //                 </h3>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
// //                   {email.attachments.map((attachment, index) => (
// //                     <div key={index} className="flex items-center p-2 border border-gray-200 rounded hover:bg-gray-50">
// //                       <div className="bg-gray-100 p-2 rounded mr-3">
// //                         <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
// //                         </svg>
// //                       </div>
// //                       <div>
// //                         <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
// //                         <p className="text-xs text-gray-500">{attachment.size}</p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

          
// //           {/* <div className="flex space-x-3 mb-8">
// //             <button 
// //               onClick={handleReply}
// //               className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
// //             >
// //               <FontAwesomeIcon icon={faReply} className="mr-2" />
// //               Reply
// //             </button>
            
// //           </div>

          
// //           {replies.length > 0 && (
// //             <div className="space-y-6 mb-8">
// //               {replies.map(reply => (
// //                 <div key={reply.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
// //                   <div className="flex justify-between items-start mb-2">
// //                     <div className="font-medium text-purple-700">{reply.sender}</div>
// //                     <div className="text-sm text-gray-500">
// //                       {new Date(reply.date).toLocaleString()}
// //                     </div>
// //                   </div>
// //                   <p className="whitespace-pre-line text-gray-800">{reply.body}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

          
// //           {isReplying && (
// //             <div className="mt-6 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
// //               <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
// //                 <h3 className="text-sm font-medium text-gray-700">Reply to {email.sender}</h3>
// //               </div>
// //               <div className="p-4">
// //                 <textarea
// //                   className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
// //                   placeholder="Write your reply here..."
// //                   value={replyContent}
// //                   onChange={(e) => setReplyContent(e.target.value)}
// //                   autoFocus
// //                 />
// //                 <div className="flex justify-end space-x-3 mt-3">
// //                   <button
// //                     onClick={handleCancelReply}
// //                     className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     onClick={handleSendReply}
// //                     className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
// //                   >
// //                     Send
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )} */}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const getLabelClass = (label) => {
// //   switch(label) {
// //     case 'Business': return 'bg-purple-100 text-purple-800';
// //     case 'Management': return 'bg-red-100 text-red-800';
// //     case 'Team': return 'bg-teal-100 text-teal-800';
// //     case 'Mail': return 'bg-yellow-100 text-yellow-800';
// //     default: return 'bg-gray-100 text-gray-800';
// //   }
// // };

// // export default EmailView;




// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faCaretDown, 
//   faReply, 
//   faPrint, 
//   faStar, 
//   faEllipsisV, 
//   faPaperclip, 
//   faTrash, 
//   faArchive, 
//   faExclamationTriangle 
// } from '@fortawesome/free-solid-svg-icons';

// const EmailView = ({ emails, drafts, onBack, onToggleFavorite, onDelete, onMarkAsSpam, onArchive, onSendEmail }) => {
  // const { emailId } = useParams();
  // const [isReplying, setIsReplying] = useState(false);
  // const [replyContent, setReplyContent] = useState('');
  // const [replies, setReplies] = useState([]);
  
//   // Search in both emails and drafts
//   const email = [...emails, ...drafts].find(e => e.id === parseInt(emailId));

//   const handleAttachmentClick = (attachment) => {
//     // If it's a real file object (from Compose before sending)
//     if (attachment.file) {
//       const fileUrl = URL.createObjectURL(attachment.file);
//       window.open(fileUrl, '_blank');
//       return;
//     }
    
//     // If it's a stored attachment (after sending/saving)
//     if (attachment.url) {
//       window.open(attachment.url, '_blank');
//       return;
//     }
    
//     // Fallback behavior
//     console.log('Opening attachment:', attachment.name);
//     alert(`Would normally open: ${attachment.name}`);
//   };

//   const getAttachmentIcon = (attachment) => {
//     const type = attachment.type || '';
    
//     if (type.includes('image/')) {
//       return (
//         <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//       );
//     }
    
//     if (type.includes('pdf')) {
//       return (
//         <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//         </svg>
//       );
//     }
    
//     if (type.includes('word') || type.includes('msword') || type.includes('document')) {
//       return (
//         <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//         </svg>
//       );
//     }
    
//     if (type.includes('spreadsheet') || type.includes('excel')) {
//       return (
//         <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//         </svg>
//       );
//     }
    
//     // Default file icon
//     return (
//       <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//       </svg>
//     );
//   };

//   if (!email) {
//     return <div className="p-8 text-center text-gray-500">Email not found</div>;
//   }

//   const handleReply = () => {
//     setIsReplying(true);
//   };

//   const handleSendReply = () => {
//     if (replyContent.trim()) {
//       const newReply = {
//         id: Date.now(),
//         sender: 'You',
//         body: replyContent,
//         date: new Date().toISOString(),
//         isReply: true
//       };
//       setReplies([...replies, newReply]);
//       setIsReplying(false);
//       setReplyContent('');
//     }
//   };

//   const handleCancelReply = () => {
//     setIsReplying(false);
//     setReplyContent('');
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <div className="flex-1 overflow-auto">
//         <div className="bg-white shadow-sm sticky top-0 z-10 p-4 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <button 
//               onClick={onBack} 
//               className="text-purple-600 hover:text-purple-800 flex items-center"
//             >
//               <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Back
//             </button>
//             <div className="flex space-x-2">
//               <button 
//                 onClick={() => onArchive([email.id])}
//                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
//                 title="Archive"
//               >
//                 <FontAwesomeIcon icon={faArchive} />
//               </button>
//               <button 
//                 onClick={() => onMarkAsSpam([email.id])}
//                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
//                 title="Report spam"
//               >
//                 <FontAwesomeIcon icon={faExclamationTriangle} />
//               </button>
//               <button 
//                 onClick={() => onDelete([email.id])}
//                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
//                 title="Delete"
//               >
//                 <FontAwesomeIcon icon={faTrash} />
//               </button>
//               <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
//                 <FontAwesomeIcon icon={faEllipsisV} />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-5xl mx-auto p-6">
//           <div className="mb-6">
//             <div className="flex justify-between items-start mb-4">
//               <h1 className="text-2xl font-semibold text-gray-800">{email.subject}</h1>
//               <div className="flex space-x-3">
//                 <button onClick={() => window.print()} className="text-gray-500 hover:text-gray-700" title="Print">
//                   <FontAwesomeIcon icon={faPrint} />
//                 </button>
//                 <button 
//                   onClick={() => onToggleFavorite([email.id], !email.isFavorite)}
//                   className={email.isFavorite ? "text-yellow-500" : "text-gray-500 hover:text-gray-700"}
//                   title="Star"
//                 >
//                   <FontAwesomeIcon icon={faStar} />
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-start space-x-4">
//               {email.avatar ? (
//                 <img 
//                   alt={`Profile of ${email.sender}`} 
//                   className="w-10 h-10 rounded-full" 
//                   src={email.avatar}
//                 />
//               ) : (
//                 <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
//                   {email.senderInitials}
//                 </div>
//               )}
              
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <div className="flex items-center space-x-2">
//                       <h2 className="font-semibold text-gray-900">{email.sender}</h2>
//                       {email.label && (
//                         <span className={`${getLabelClass(email.label)} px-2 py-0.5 rounded-full text-xs`}>
//                           {email.label}
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-gray-500 text-sm">
//                       to me
//                       <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
//                     </p>
//                   </div>
//                   <div className="text-gray-500 text-sm">
//                     {new Date(email.date).toLocaleString()}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="prose max-w-none mb-8 p-4 bg-white rounded-lg border border-gray-200">
//             <p className="whitespace-pre-line text-gray-800">{email.body}</p>
            
//             {email.attachments && email.attachments.length > 0 && (
//               <div className="mt-6 pt-4 border-t border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
//                   <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
//                   Attachments ({email.attachments.length})
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {email.attachments.map((attachment, index) => (
//                     <div 
//                       key={index} 
//                       onClick={() => handleAttachmentClick(attachment)}
//                       className="flex items-center p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer transition-colors"
//                     >
//                       <div className="bg-gray-100 p-2 rounded mr-3">
//                         {getAttachmentIcon(attachment)}
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
//                         <p className="text-xs text-gray-500">{attachment.size}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex space-x-3 mb-8">
//             <button 
//               onClick={handleReply}
//               className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
//             >
//               <FontAwesomeIcon icon={faReply} className="mr-2" />
//               Reply
//             </button>
//           </div>

//           {replies.length > 0 && (
//             <div className="space-y-6 mb-8">
//               {replies.map(reply => (
//                 <div key={reply.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="font-medium text-purple-700">{reply.sender}</div>
//                     <div className="text-sm text-gray-500">
//                       {new Date(reply.date).toLocaleString()}
//                     </div>
//                   </div>
//                   <p className="whitespace-pre-line text-gray-800">{reply.body}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {isReplying && (
//             <div className="mt-6 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//               <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-700">Reply to {email.sender}</h3>
//               </div>
//               <div className="p-4">
//                 <textarea
//                   className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
//                   placeholder="Write your reply here..."
//                   value={replyContent}
//                   onChange={(e) => setReplyContent(e.target.value)}
//                   autoFocus
//                 />
//                 <div className="flex justify-end space-x-3 mt-3">
//                   <button
//                     onClick={handleCancelReply}
//                     className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSendReply}
//                     className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//                   >
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const getLabelClass = (label) => {
//   switch(label) {
//     case 'Business': return 'bg-purple-100 text-purple-800';
//     case 'Management': return 'bg-red-100 text-red-800';
//     case 'Team': return 'bg-teal-100 text-teal-800';
//     case 'Mail': return 'bg-yellow-100 text-yellow-800';
//     default: return 'bg-gray-100 text-gray-800';
//   }
// };

// export default EmailView;





// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretDown, faReply, faPrint, faStar } from '@fortawesome/free-solid-svg-icons';

// const EmailView = ({ emails, drafts, onBack, onToggleFavorite, onDelete, onMarkAsSpam, onArchive }) => {
//   const { emailId } = useParams();
//   // const navigate = useNavigate();
  
//   // Search in both emails and drafts
//   const email = [...emails, ...drafts].find(e => e.id === parseInt(emailId));

//   if (!email) {
//     return <div>Email not found</div>;
//   }

//   return (
//     <div className="bg-white text-gray-800">
//       <div className="max-w-4xl mx-auto p-4">
//         <div className="flex justify-between items-center mb-4">
//           <button onClick={onBack} className="text-purple-600 hover:text-purple-800">
//             ← Back
//           </button>
//           <div className="flex space-x-2">
//             {email.label && (
//               <span className={`${getLabelClass(email.label)} px-2 py-1 rounded-full text-sm`}>
//                 {email.label}
//               </span>
//             )}
//           </div>
//         </div>
        
//         <div className="flex items-start space-x-4">
//           {email.avatar ? (
//             <img 
//               alt={`Profile of ${email.sender}`} 
//               className="w-12 h-12 rounded-full" 
//               src={email.avatar}
//             />
//           ) : (
//             <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center">
//               {email.senderInitials}
//             </div>
//           )}
          
//           <div className="flex-1">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="font-semibold">{email.sender}</h2>
//                 <p className="text-gray-500">
//                   to me
//                   <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
//                 </p>
//               </div>
//               <div className="text-gray-500 text-sm">
//                 <FontAwesomeIcon icon={faReply} className="mr-1" />
//                 <span>{new Date(email.date).toLocaleDateString()}</span>
//               </div>
//             </div>
            
//             <div className="mt-4">
//               <p className="whitespace-pre-line">{email.body}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex justify-end items-center mt-4 space-x-4">
//           <button onClick={() => window.print()}>
//             <FontAwesomeIcon icon={faPrint} className="text-gray-500" />
//           </button>
//           <button onClick={() => onToggleFavorite([email.id], !email.isFavorite)}>
//             <FontAwesomeIcon 
//               icon={faStar} 
//               className={email.isFavorite ? "text-yellow-500" : "text-gray-500"} 
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const getLabelClass = (label) => {
//   switch(label) {
//     case 'Business': return 'bg-purple-100 text-purple-600';
//     case 'Management': return 'bg-red-100 text-red-600';
//     case 'Team': return 'bg-teal-100 text-teal-600';
//     case 'Mail': return 'bg-yellow-100 text-yellow-600';
//     default: return 'bg-gray-100 text-gray-600';
//   }
// };

// export default EmailView;


// // WORKS 99
// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretDown, faReply, faPrint, faStar, faEllipsisV, faPaperclip, faTrash, faArchive, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// import ComposeEmail from './ComposeEmail'; // Assuming you have a ComposeEmail component

// const EmailView = ({ emails, drafts, onBack, onToggleFavorite, onDelete, onMarkAsSpam, onArchive, onSendEmail }) => {
//   const { emailId } = useParams();
//   const [isReplying, setIsReplying] = useState(false);
//   const [replyContent, setReplyContent] = useState('');
//   const [replies, setReplies] = useState([]);
  
//   // Search in both emails and drafts
//   const email = [...emails, ...drafts].find(e => e.id === parseInt(emailId));

//   if (!email) {
//     return <div className="p-8 text-center text-gray-500">Email not found</div>;
//   }

//   const handleReply = () => {
//     setIsReplying(true);
//   };

//   const handleSendReply = () => {
//     if (replyContent.trim()) {
//       const newReply = {
//         id: Date.now(),
//         sender: 'You',
//         body: replyContent,
//         date: new Date().toISOString(),
//         isReply: true
//       };
//       setReplies([...replies, newReply]);
//       setIsReplying(false);
//       setReplyContent('');
      
//       // In a real app, you would call onSendEmail here
//       // onSendEmail({
//       //   to: email.sender,
//       //   subject: `Re: ${email.subject}`,
//       //   body: replyContent
//       // });
//     }
//   };

//   const handleCancelReply = () => {
//     setIsReplying(false);
//     setReplyContent('');
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Left sidebar - can be used for email list or other navigation */}
//       {/* <div className="w-64 bg-white border-r border-gray-200 hidden md:block"></div> */}
      
//       {/* Main email content */}
//       <div className="flex-1 overflow-auto">
//         <div className="bg-white shadow-sm sticky top-0 z-10 p-4 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <button 
//               onClick={onBack} 
//               className="text-purple-600 hover:text-purple-800 flex items-center"
//             >
//               <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Back
//             </button>
//             <div className="flex space-x-2">
//               <button 
//                 onClick={() => onArchive([email.id])}
//                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
//                 title="Archive"
//               >
//                 <FontAwesomeIcon icon={faArchive} />
//               </button>
//               <button 
//                 onClick={() => onMarkAsSpam([email.id])}
//                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
//                 title="Report spam"
//               >
//                 <FontAwesomeIcon icon={faExclamationTriangle} />
//               </button>
//               <button 
//                 onClick={() => onDelete([email.id])}
//                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
//                 title="Delete"
//               >
//                 <FontAwesomeIcon icon={faTrash} />
//               </button>
//               <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
//                 <FontAwesomeIcon icon={faEllipsisV} />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-5xl mx-auto p-6">
//           {/* Email header */}
//           <div className="mb-6">
//             <div className="flex justify-between items-start mb-4">
//               <h1 className="text-2xl font-semibold text-gray-800">{email.subject}</h1>
//               <div className="flex space-x-3">
//                 <button onClick={() => window.print()} className="text-gray-500 hover:text-gray-700" title="Print">
//                   <FontAwesomeIcon icon={faPrint} />
//                 </button>
//                 <button 
//                   onClick={() => onToggleFavorite([email.id], !email.isFavorite)}
//                   className={email.isFavorite ? "text-yellow-500" : "text-gray-500 hover:text-gray-700"}
//                   title="Star"
//                 >
//                   <FontAwesomeIcon icon={faStar} />
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-start space-x-4">
//               {email.avatar ? (
//                 <img 
//                   alt={`Profile of ${email.sender}`} 
//                   className="w-10 h-10 rounded-full" 
//                   src={email.avatar}
//                 />
//               ) : (
//                 <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
//                   {email.senderInitials}
//                 </div>
//               )}
              
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <div className="flex items-center space-x-2">
//                       <h2 className="font-semibold text-gray-900">{email.sender}</h2>
//                       {email.label && (
//                         <span className={`${getLabelClass(email.label)} px-2 py-0.5 rounded-full text-xs`}>
//                           {email.label}
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-gray-500 text-sm">
//                       to me
//                       <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
//                     </p>
//                   </div>
//                   <div className="text-gray-500 text-sm">
//                     {new Date(email.date).toLocaleString()}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Email body */}
//           <div className="prose max-w-none mb-8 p-4 bg-white rounded-lg border border-gray-200">
//             <p className="whitespace-pre-line text-gray-800">{email.body}</p>
            
//             {email.attachments && email.attachments.length > 0 && (
//               <div className="mt-6 pt-4 border-t border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
//                   <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
//                   Attachments ({email.attachments.length})
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {email.attachments.map((attachment, index) => (
//                     <div key={index} className="flex items-center p-2 border border-gray-200 rounded hover:bg-gray-50">
//                       <div className="bg-gray-100 p-2 rounded mr-3">
//                         <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
//                         <p className="text-xs text-gray-500">{attachment.size}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

          
//           {/* <div className="flex space-x-3 mb-8">
//             <button 
//               onClick={handleReply}
//               className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
//             >
//               <FontAwesomeIcon icon={faReply} className="mr-2" />
//               Reply
//             </button>
            
//           </div>

          
//           {replies.length > 0 && (
//             <div className="space-y-6 mb-8">
//               {replies.map(reply => (
//                 <div key={reply.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="font-medium text-purple-700">{reply.sender}</div>
//                     <div className="text-sm text-gray-500">
//                       {new Date(reply.date).toLocaleString()}
//                     </div>
//                   </div>
//                   <p className="whitespace-pre-line text-gray-800">{reply.body}</p>
//                 </div>
//               ))}
//             </div>
//           )}

          
//           {isReplying && (
//             <div className="mt-6 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//               <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-700">Reply to {email.sender}</h3>
//               </div>
//               <div className="p-4">
//                 <textarea
//                   className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
//                   placeholder="Write your reply here..."
//                   value={replyContent}
//                   onChange={(e) => setReplyContent(e.target.value)}
//                   autoFocus
//                 />
//                 <div className="flex justify-end space-x-3 mt-3">
//                   <button
//                     onClick={handleCancelReply}
//                     className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSendReply}
//                     className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//                   >
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// const getLabelClass = (label) => {
//   switch(label) {
//     case 'Business': return 'bg-purple-100 text-purple-800';
//     case 'Management': return 'bg-red-100 text-red-800';
//     case 'Team': return 'bg-teal-100 text-teal-800';
//     case 'Mail': return 'bg-yellow-100 text-yellow-800';
//     default: return 'bg-gray-100 text-gray-800';
//   }
// };

// export default EmailView;




import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCaretDown, 
  faReply, 
  faPrint, 
  faStar, 
  faEllipsisV, 
  faPaperclip, 
  faTrash, 
  faArchive, 
  faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons';

const EmailView = ({ 
  emails = [], 
  drafts = [], 
  onBack, 
  onToggleFavorite, 
  onDelete, 
  onMarkAsSpam, 
  onArchive 
}) => {
  const { emailId } = useParams();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState([]);

  
  // Search in both emails and drafts
  const email = [...emails, ...drafts].find(e => e.id === parseInt(emailId));

  const handleDelete = () => {
    onDelete([email.id]);
    onBack();
  };

  const handleMarkAsSpam = () => {
    onMarkAsSpam([email.id]);
    onBack();
  };

  const handleArchive = () => {
    onArchive([email.id]);
    onBack();
  };

  const handleAttachmentClick = (attachment) => {
    // If it's a real file object (from Compose before sending)
    if (attachment.file) {
      const fileUrl = URL.createObjectURL(attachment.file);
      window.open(fileUrl, '_blank');
      return;
    }
    
    // If it's a stored attachment (after sending/saving)
    if (attachment.url) {
      window.open(attachment.url, '_blank');
      return;
    }
    
    // Fallback behavior
    console.log('Opening attachment:', attachment.name);
    alert(`Would normally open: ${attachment.name}`);
  };

  const getAttachmentIcon = (attachment) => {
    const type = attachment.type || '';
    
    if (type.includes('image/')) {
      return (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    
    if (type.includes('pdf')) {
      return (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
    
    if (type.includes('word') || type.includes('msword') || type.includes('document')) {
      return (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
    
    if (type.includes('spreadsheet') || type.includes('excel')) {
      return (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
    
    // Default file icon
    return (
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    );
  };

  if (!email) {
    return <div className="p-8 text-center text-gray-500">Email not found</div>;
  }

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleSendReply = () => {
    if (replyContent.trim()) {
      const newReply = {
        id: Date.now(),
        sender: 'You',
        body: replyContent,
        date: new Date().toISOString(),
        isReply: true
      };
      setReplies([...replies, newReply]);
      setIsReplying(false);
      setReplyContent('');
    }
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyContent('');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm sticky top-0 z-10 p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <button 
              onClick={onBack} 
              className="text-purple-600 hover:text-purple-800 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="flex space-x-2">
            <button 
                onClick={handleArchive}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                title="Archive"
              >
                <FontAwesomeIcon icon={faArchive} />
              </button>
              <button 
                onClick={handleMarkAsSpam}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                title="Report spam"
              >
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </button>
              <button 
                onClick={handleDelete}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-6">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-semibold text-gray-800">{email.subject}</h1>
              <div className="flex space-x-3">
                <button onClick={() => window.print()} className="text-gray-500 hover:text-gray-700" title="Print">
                  <FontAwesomeIcon icon={faPrint} />
                </button>
                <button 
                  onClick={() => onToggleFavorite([email.id], !email.isFavorite)}
                  className={email.isFavorite ? "text-yellow-500" : "text-gray-500 hover:text-gray-700"}
                  title="Star"
                >
                  <FontAwesomeIcon icon={faStar} />
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              {email.avatar ? (
                <img 
                  alt={`Profile of ${email.sender}`} 
                  className="w-10 h-10 rounded-full" 
                  src={email.avatar}
                />
              ) : (
                <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
                  {email.senderInitials}
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="font-semibold text-gray-900">{email.sender}</h2>
                      {email.label && (
                        <span className={`${getLabelClass(email.label)} px-2 py-0.5 rounded-full text-xs`}>
                          {email.label}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">
                      to me
                      <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                    </p>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {new Date(email.date).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-8 p-4 bg-white rounded-lg border border-gray-200">
            <p className="whitespace-pre-line text-gray-800">{email.body}</p>
            
            {email.attachments && email.attachments.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
                  Attachments ({email.attachments.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {email.attachments.map((attachment, index) => (
                    <div 
                      key={index} 
                      onClick={() => handleAttachmentClick(attachment)}
                      className="flex items-center p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="bg-gray-100 p-2 rounded mr-3">
                        {getAttachmentIcon(attachment)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{attachment.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3 mb-8">
            <button 
              onClick={handleReply}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
            >
              <FontAwesomeIcon icon={faReply} className="mr-2" />
              Reply
            </button>
          </div>

          {replies.length > 0 && (
            <div className="space-y-6 mb-8">
              {replies.map(reply => (
                <div key={reply.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-purple-700">{reply.sender}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(reply.date).toLocaleString()}
                    </div>
                  </div>
                  <p className="whitespace-pre-line text-gray-800">{reply.body}</p>
                </div>
              ))}
            </div>
          )}

          {isReplying && (
            <div className="mt-6 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Reply to {email.sender}</h3>
              </div>
              <div className="p-4">
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Write your reply here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  autoFocus
                />
                <div className="flex justify-end space-x-3 mt-3">
                  <button
                    onClick={handleCancelReply}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendReply}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getLabelClass = (label) => {
  switch(label) {
    case 'Business': return 'bg-purple-100 text-purple-800';
    case 'Management': return 'bg-red-100 text-red-800';
    case 'Team': return 'bg-teal-100 text-teal-800';
    case 'Mail': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default EmailView;