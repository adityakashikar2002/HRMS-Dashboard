const ProgressSteps = ({ steps, currentStep }) => {
    return (
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 
              ${step.number < currentStep ? 'bg-green-100 text-green-600' : 
                step.number === currentStep ? 'bg-blue-600 text-white' : 
                'bg-gray-100 text-gray-600'}`}
            >
              {step.number < currentStep ? (
                <i className="fas fa-check"></i>
              ) : (
                step.number
              )}
            </div>
            <span className={`text-sm ${step.number <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${step.number < currentStep ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default ProgressSteps;