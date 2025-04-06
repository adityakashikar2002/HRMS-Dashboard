import { format } from 'date-fns';

const EventDetails = ({ event, onEdit, onDelete, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Event Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div 
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: event.color }}
            ></div>
            <h3 className="text-lg font-medium">{event.title}</h3>
          </div>
          
          <div className="flex items-start mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p>{format(event.start, 'EEEE, MMMM d, yyyy')}</p>
              <p className="text-gray-600">
                {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
              </p>
            </div>
          </div>
          
          {event.description && (
            <div className="flex items-start mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700">{event.description}</p>
            </div>
          )}
          {event.isRecurring && (
            <div className="flex items-start mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div>
                <p className="text-blue-600">Recurring Event (Mon-Fri)</p>
                <p className="text-blue-400 text-xs">Editing will update all future occurrences</p>
              </div>
            </div>
          )}
          {event.attachments && event.attachments.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Attachments</h4>
              <div className="space-y-2">
                {event.attachments.map(attachment => (
                  <a 
                    key={attachment.id}
                    href={attachment.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-2 border rounded hover:bg-gray-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">{attachment.name}</span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {Math.round(attachment.size / 1024)} KB
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6">
            <button 
              onClick={() => {
                onEdit();
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(event.id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;