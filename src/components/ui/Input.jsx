const Input = ({ label, id, className = '', ...props }) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          id={id}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          {...props}
        />
      </div>
    );
  };
  
  export default Input;