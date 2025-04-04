// import React, { useState } from 'react';
// import { FaTimes, FaPaperclip } from 'react-icons/fa';
// import LabelSelector from './LabelSelector';

// const ComposeEmail = ({ setComposeOpen, onSend, onSaveDraft }) => {
//   const [email, setEmail] = useState({
//     to: '',
//     subject: '',
//     body: '',
//     label: '',
//     isDraft: false
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmail(prev => ({ ...prev, [name]: value }));
//   };

//   const handleLabelSelect = (label) => {
//     setEmail(prev => ({ ...prev, label }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const emailToSubmit = { 
//       ...email,
//       from: 'Me', // Add your default from address here
//       sender: 'me',
//       date: new Date().toISOString(),
//       isRead: true,
//       isSent: true
//     };
    
//     onSend(emailToSubmit);
//     setComposeOpen(false);
//     setEmail({ to: '', subject: '', body: '', label: '', isDraft: false });
//   };
  
//   const saveAsDraft = (e) => {
//     e.preventDefault();
//     const draftEmail = { 
//       ...email,
//       isDraft: true,
//       date: new Date().toISOString()
//     };
//     onSaveDraft(draftEmail);
//     setComposeOpen(false);
//     setEmail({ to: '', subject: '', body: '', label: '', isDraft: false });
//   };

//   return (
//     <div className="fixed bottom-0 right-0 w-full max-w-xl bg-white shadow-xl rounded-t-lg border border-gray-300 z-10">
//       <div className="flex justify-between items-center bg-gray-800 text-white p-3 rounded-t-lg">
//         <h3 className="text-lg font-medium">New Message</h3>
//         <button 
//           onClick={() => setComposeOpen(false)}
//           className="text-white hover:text-gray-300"
//         >
//           <FaTimes />
//         </button>
//       </div>
//       <form onSubmit={handleSubmit} className="p-4">
//         <div className="mb-4">
//           <input
//             type="email"
//             name="to"
//             value={email.to}
//             onChange={handleChange}
//             placeholder="To"
//             className="w-full p-2 border-b border-gray-300 focus:border-purple-500 focus:outline-none"
//             required={!email.isDraft}
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="text"
//             name="subject"
//             value={email.subject}
//             onChange={handleChange}
//             placeholder="Subject"
//             className="w-full p-2 border-b border-gray-300 focus:border-purple-500 focus:outline-none"
//           />
//         </div>
//         <div className="mb-4">
//           <LabelSelector 
//             selectedLabel={email.label}
//             onSelect={handleLabelSelect}
//           />
//         </div>
//         <div className="mb-4">
//           <textarea
//             name="body"
//             value={email.body}
//             onChange={handleChange}
//             placeholder="Compose email..."
//             className="w-full p-2 border border-gray-300 rounded focus:border-purple-500 focus:outline-none"
//             rows="10"
//           />
//         </div>
//         <div className="flex justify-between items-center">
//           <div className="flex space-x-2">
//             <button
//               type="submit"
//               className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
//             >
//               Send
//             </button>
//             <button
//               type="button"
//               onClick={saveAsDraft}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
//             >
//               Save Draft
//             </button>
//             <button
//               type="button"
//               className="text-gray-600 hover:text-gray-800 p-2"
//             >
//               <FaPaperclip />
//             </button>
//           </div>
//           <button
//             type="button"
//             onClick={() => setComposeOpen(false)}
//             className="text-gray-600 hover:text-gray-800"
//           >
//             Discard
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ComposeEmail;




import React, { useState, useRef } from 'react';
import { FaTimes, FaPaperclip, FaTrash } from 'react-icons/fa';
import LabelSelector from './LabelSelector';

const ComposeEmail = ({ setComposeOpen, onSend, onSaveDraft }) => {
  const [email, setEmail] = useState({
    to: '',
    subject: '',
    body: '',
    label: '',
    isDraft: false,
    attachments: []
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(prev => ({ ...prev, [name]: value }));
  };

  const handleLabelSelect = (label) => {
    setEmail(prev => ({ ...prev, label }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      file // store the actual file object
    }));
    
    setEmail(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
    
    // Reset file input
    e.target.value = null;
  };

  const removeAttachment = (index) => {
    setEmail(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailToSubmit = { 
      ...email,
      from: 'Me',
      sender: 'me',
      date: new Date().toISOString(),
      isRead: true,
      isSent: true
    };
    
    onSend(emailToSubmit);
    setComposeOpen(false);
    setEmail({ to: '', subject: '', body: '', label: '', isDraft: false, attachments: [] });
  };
  
  const saveAsDraft = (e) => {
    e.preventDefault();
    const draftEmail = { 
      ...email,
      isDraft: true,
      date: new Date().toISOString()
    };
    onSaveDraft(draftEmail);
    setComposeOpen(false);
    setEmail({ to: '', subject: '', body: '', label: '', isDraft: false, attachments: [] });
  };

  return (
    <div className="fixed bottom-0 right-0 w-full max-w-xl bg-white shadow-xl rounded-t-lg border border-gray-300 z-10">
      <div className="flex justify-between items-center bg-gray-800 text-white p-3 rounded-t-lg">
        <h3 className="text-lg font-medium">New Message</h3>
        <button 
          onClick={() => setComposeOpen(false)}
          className="text-white hover:text-gray-300"
        >
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <input
            type="email"
            name="to"
            value={email.to}
            onChange={handleChange}
            placeholder="To"
            className="w-full p-2 border-b border-gray-300 focus:border-purple-500 focus:outline-none"
            required={!email.isDraft}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="subject"
            value={email.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full p-2 border-b border-gray-300 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <LabelSelector 
            selectedLabel={email.label}
            onSelect={handleLabelSelect}
          />
        </div>
        <div className="mb-4">
          <textarea
            name="body"
            value={email.body}
            onChange={handleChange}
            placeholder="Compose email..."
            className="w-full p-2 border border-gray-300 rounded focus:border-purple-500 focus:outline-none"
            rows="10"
          />
        </div>
        
        {/* Attachments preview */}
        {email.attachments.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments ({email.attachments.length})</h4>
            <div className="space-y-2">
              {email.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                  <div className="flex items-center">
                    <FaPaperclip className="text-gray-500 mr-2" />
                    <span className="text-sm">{attachment.name}</span>
                    <span className="text-xs text-gray-500 ml-2">({attachment.size})</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
            >
              Send
            </button>
            <button
              type="button"
              onClick={saveAsDraft}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-gray-600 hover:text-gray-800 p-2"
              title="Attach files"
            >
              <FaPaperclip />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
          </div>
          <button
            type="button"
            onClick={() => setComposeOpen(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposeEmail;