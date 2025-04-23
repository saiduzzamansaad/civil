const Button = ({ children, type = 'button', variant = 'default', className = '', ...props }) => {
    const variants = {
      default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      success: 'bg-green-600 text-white hover:bg-green-700'
    };
  
    return (
      <button
        type={type}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;