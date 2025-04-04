import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

const EventForm = ({ event, onSave, onClose }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [startDate, setStartDate] = useState(format(event?.start || new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState(format(event?.start || new Date(), 'HH:mm'));
  const [endDate, setEndDate] = useState(format(event?.end || new Date(), 'yyyy-MM-dd'));
  const [endTime, setEndTime] = useState(format(event?.end || new Date(new Date().getTime() + 30 * 60000), 'HH:mm'));
  const [color, setColor] = useState(event?.color || '#3b82f6');
  const [errors, setErrors] = useState({});

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   if (!validate()) return;
    
  //   const startDateTime = new Date(`${startDate}T${startTime}`);
  //   const endDateTime = new Date(`${endDate}T${endTime}`);
    
  //   const eventData = {
  //     id: event?.id || Date.now(),
  //     title,
  //     description,
  //     start: startDateTime,
  //     end: endDateTime,
  //     color
  //   };
    
  //   onSave(eventData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const eventData = {
      ...(event?.originalId && { originalId: event.originalId }),
      ...(event?.isRecurring && { isRecurring: true }),
      id: event?.id || Date.now(),
      title,
      description,
      start: new Date(`${startDate}T${startTime}`),
      end: new Date(`${endDate}T${endTime}`),
      color
    };
    
    onSave(eventData);
  };

  const colorOptions = [
    { value: '#3b82f6', name: 'Blue' },
    { value: '#ef4444', name: 'Red' },
    { value: '#10b981', name: 'Green' },
    { value: '#f59e0b', name: 'Yellow' },
    { value: '#8b5cf6', name: 'Purple' },
  ];

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
              Color
            </label>
            <div className="flex space-x-2">
              {colorOptions.map((option) => (
                <div 
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${color === option.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ backgroundColor: option.value }}
                >
                  {color === option.value && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              ))}
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