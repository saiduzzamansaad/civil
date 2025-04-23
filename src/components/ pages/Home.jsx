import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showInputModal, setShowInputModal] = useState(false);
  const [newTool, setNewTool] = useState({
    title: '',
    description: '',
    path: '',
    bgColor: 'bg-gradient-to-br from-gray-600 to-gray-700'
  });

  const tools = [
    {
      title: "Bar Bending Schedule",
      description: "Calculate cutting length and weight of reinforcement bars with precision",
      path: "/bbs-calculator",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 10l-2 2 4 4 2-2-4-4z" />
          <path d="M3 17l4 4 2-2-4-4-2 2z" />
          <path d="M10 3l2-2 4 4-2 2-4-4z" />
          <path d="M17 3l4 4-2 2-4-4 2-2z" />
          <path d="M21 7l-4-4-2 2 4 4 2-2z" />
          <path d="M7 21l-4-4 2-2 4 4-2 2z" />
          <path d="M3 7l4-4 2 2-4 4-2-2z" />
          <path d="M7 3l-4 4-2-2 4-4 2 2z" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-blue-600 to-blue-700",
      category: 'structural'
    },
    {
      title: "Brick Calculator",
      description: "Estimate bricks, cement, sand and mortar required for your project",
      path: "/brick-calculator",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-emerald-600 to-teal-700",
      category: 'materials'
    },
    {
      title: "Unit Converter",
      description: "Convert between different construction units and measurements",
      path: "/unit-converter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 6h18" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
          <path d="M12 6l4 6-4 6" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-purple-600 to-indigo-700",
      category: 'utilities'
    },
    {
      title: "Load Calculator",
      description: "Calculate dead load, live load and total load for structural analysis",
      path: "/load-calculator",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <path d="M4.93 19.07l2.83-2.83" />
          <path d="M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-amber-600 to-orange-700",
      category: 'structural'
    },
    {
      title: "Concrete Calculator",
      description: "Calculate concrete volume and materials for your construction",
      path: "/concrete-calculator",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12h-4l-3-9L6 3l-3 9v9a2 2 0 002 2h16a2 2 0 002-2v-9z" />
          <path d="M9 12l3-6 3 6" />
          <path d="M9 21v-6h6v6" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-gray-600 to-gray-800",
      category: 'materials'
    },
    {
      title: "Steel Weight Calculator",
      description: "Calculate weight of steel bars and plates",
      path: "/steel-calculator",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 3v18" />
          <path d="M18 3v18" />
          <path d="M3 6h18" />
          <path d="M3 18h18" />
          <path d="M6 6l12 12" />
          <path d="M6 18l12-12" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-red-600 to-red-800",
      category: 'structural'
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || tool.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleAddTool = () => {
    // In a real app, you would save this to your database/state management
    tools.push(newTool);
    setShowInputModal(false);
    setNewTool({
      title: '',
      description: '',
      path: '',
      bgColor: 'bg-gradient-to-br from-gray-600 to-gray-700'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Civil Engineering</span> Tools
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Professional-grade calculation tools for modern construction projects
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white rounded-xl shadow-md p-4 md:p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'structural' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('structural')}
                >
                  Structural
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'materials' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('materials')}
                >
                  Materials
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'utilities' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('utilities')}
                >
                  Utilities
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
                onClick={() => setShowInputModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredTools.map((tool, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <Link 
                  to={tool.path}
                  className="group block h-full"
                >
                  <div className={`${tool.bgColor} h-64 flex flex-col justify-between p-8 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEuOS0yIDItMmgxMGMxLjEgMCAyIC45IDIgMnYxMGMwIDEuMS0uOSAyLTIgMkgzOGMtMS4xIDAtMi0uOS0yLTJWMzR6TTE2IDM0YzAtMS4xLjktMiAyLTJoMTBjMS4xIDAgMiAuOSAyIDJ2MTBjMCAxLjEtLjkgMi0yIDJIMThjLTEuMSAwLTItLjktMi0yVjM0ek0xNiA0YzAtMS4xLjktMiAyLTJoMTBjMS4xIDAgMiAuOSAyIDJ2MTBjMCAxLjEtLjkgMi0yIDJIMThjLTEuMSAwLTItLjktMi0yVjR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
                    </div>
                    
                    {/* Tool content */}
                    <div className="relative z-10">
                      <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-white bg-opacity-20 backdrop-blur-sm group-hover:bg-opacity-30 transition-all">
                        {tool.icon}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">{tool.title}</h2>
                      <p className="text-white text-opacity-90 font-light">{tool.description}</p>
                    </div>
                    
                    {/* Animated arrow */}
                    <div className="relative z-10 flex justify-end">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 transform group-hover:translate-x-2 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                setSearchTerm('');
                setActiveTab('all');
              }}
            >
              Reset filters
            </button>
          </motion.div>
        )}

        {/* Add Tool Modal */}
        {showInputModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Add New Tool</h3>
                <button
                  onClick={() => setShowInputModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tool Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newTool.title}
                    onChange={(e) => setNewTool({...newTool, title: e.target.value})}
                    placeholder="e.g., Foundation Calculator"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={newTool.description}
                    onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                    placeholder="Brief description of what the tool does"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Path</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newTool.path}
                    onChange={(e) => setNewTool({...newTool, path: e.target.value})}
                    placeholder="e.g., /foundation-calculator"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newTool.category}
                    onChange={(e) => setNewTool({...newTool, category: e.target.value})}
                  >
                    <option value="structural">Structural</option>
                    <option value="materials">Materials</option>
                    <option value="utilities">Utilities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      'bg-gradient-to-br from-blue-600 to-blue-700',
                      'bg-gradient-to-br from-emerald-600 to-teal-700',
                      'bg-gradient-to-br from-purple-600 to-indigo-700',
                      'bg-gradient-to-br from-amber-600 to-orange-700',
                      'bg-gradient-to-br from-gray-600 to-gray-700',
                      'bg-gradient-to-br from-red-600 to-red-700',
                      'bg-gradient-to-br from-green-600 to-green-700',
                      'bg-gradient-to-br from-pink-600 to-pink-700'
                    ].map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`h-8 rounded-md ${color} ${newTool.bgColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                        onClick={() => setNewTool({...newTool, bgColor: color})}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowInputModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleAddTool}
                >
                  Add Tool
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Recent Calculations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Calculations</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View All</button>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameters</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      tool: 'Concrete Calculator',
                      date: '2023-05-15',
                      parameters: 'Slab: 5m x 4m x 0.15m, M20 Grade',
                      result: '3.45 m³ concrete'
                    },
                    {
                      tool: 'Steel Weight Calculator',
                      date: '2023-05-14',
                      parameters: 'Round Bar: 16mm, 12m length, 5 nos',
                      result: '94.8 kg total'
                    },
                    {
                      tool: 'Brick Calculator',
                      date: '2023-05-12',
                      parameters: 'Wall: 10m x 3m, 230mm thick',
                      result: '4,320 bricks'
                    },
                    {
                      tool: 'Load Calculator',
                      date: '2023-05-10',
                      parameters: 'Slab: 6m x 5m, RCC, 150mm',
                      result: '112.5 kN/m²'
                    }
                  ].map((calc, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{calc.tool}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calc.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calc.parameters}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{calc.result}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;