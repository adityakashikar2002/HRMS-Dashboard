import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const EventForm = ({ event, onSave, onClose }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [startDate, setStartDate] = useState(format(event?.start || new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState(format(event?.start || new Date(), 'HH:mm'));
  const [endDate, setEndDate] = useState(format(event?.end || new Date(), 'yyyy-MM-dd'));
  const [endTime, setEndTime] = useState(format(event?.end || new Date(new Date().getTime() + 30 * 60000), 'HH:mm'));
  const [color, setColor] = useState(event?.color || '#3b82f6');
  const [errors, setErrors] = useState({});
  const [attachments, setAttachments] = useState(event?.attachments || []);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      setStartDate(format(event.start, 'yyyy-MM-dd'));
      setStartTime(format(event.start, 'HH:mm'));
      setEndDate(format(event.end, 'yyyy-MM-dd'));
      setEndTime(format(event.end, 'HH:mm'));
      setColor(event.color || '#3b82f6');
    }
  }, [event]);

  const validate = () => {
    const newErrors = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!startDate) newErrors.startDate = 'Start date is required';
    if (!startTime) newErrors.startTime = 'Start time is required';
    if (!endDate) newErrors.endDate = 'End date is required';
    if (!endTime) newErrors.endTime = 'End time is required';
    
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    
    if (startDateTime >= endDateTime) {
      newErrors.dateRange = 'End time must be after start time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const eventData = {
      ...(event?.originalId && { originalId: event.originalId }),
      ...(event?.isRecurring && { isRecurring: true }),
      id: event?.id || Date.now(),
      title,
      description,
      attachments,
      start: new Date(`${startDate}T${startTime}`),
      end: new Date(`${endDate}T${endTime}`),
      color
    };
    
    onSave(eventData);
  };

  const colorOptions = [
    { value: '#3b82f6', name: 'Meeting', category: 'predefined' },
    { value: '#10b981', name: 'Client Interaction', category: 'predefined' },
    { value: '#f59e0b', name: 'Interview', category: 'predefined' },
    { value: '#ef4444', name: 'Project', category: 'predefined' },
    { value: 'custom', name: 'Custom', category: 'custom' }
  ];

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#94a3b8');

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    // Simulate file upload (in a real app, you'd upload to a server)
    setTimeout(() => {
      const newAttachments = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file) // In real app, this would be server URL
      }));
      
      setAttachments(prev => [...prev, ...newAttachments]);
      setUploading(false);
    }, 1000);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{event?.id ? 'Edit Event' : 'New Event'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Event title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows="3"
              placeholder="Event description"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                Start Date *
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`w-full px-3 py-2 border rounded ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                Start Time *
              </label>
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={`w-full px-3 py-2 border rounded ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                End Date *
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full px-3 py-2 border rounded ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                End Time *
              </label>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={`w-full px-3 py-2 border rounded ${errors.endTime ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
            </div>
          </div>
          
          {errors.dateRange && <p className="text-red-500 text-xs mb-4">{errors.dateRange}</p>}
          {event?.isRecurring && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Recurrence
            </label>
            <div className="bg-blue-50 p-3 rounded text-sm">
              <p className="text-blue-800">This is a recurring event</p>
              <p className="text-blue-600">Editing will affect all future occurrences</p>
            </div>
          </div>
        )}
        
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Event Type
            </label>
            <select
              value={color}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setShowColorPicker(true);
                } else {
                  setColor(e.target.value);
                  setShowColorPicker(false);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            >
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>

            {showColorPicker && (
              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Custom Color
                </label>
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    setColor(e.target.value);
                  }}
                  className="w-full h-10 cursor-pointer"
                />
                <div className="flex items-center mt-2">
                  <div 
                    className="w-6 h-6 rounded mr-2"
                    style={{ backgroundColor: customColor }}
                  ></div>
                  <span className="text-sm">{customColor}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Attachments
            </label>
            <div className="border border-dashed border-gray-300 rounded p-4">
              <input 
                type="file" 
                multiple
                onChange={handleFileUpload}
                className="hidden" 
                id="file-upload"
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Add Files
              </label>
              {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
              
              <div className="mt-3 space-y-2">
                {attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center truncate">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate text-sm">{attachment.name}</span>
                    </div>
                    <button 
                      onClick={() => removeAttachment(attachment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;