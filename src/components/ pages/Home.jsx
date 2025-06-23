import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  HardHat,
  Ruler,
  Box,
  Zap,
  ClipboardCheck,
  ArrowRight,
  Plus,
  Search,
  RefreshCw,
  Calculator,
  Weight,
  BrickWall,
  Loader,
  Download,
  Trash2,
  Eye,
  ChevronDown,
  X,
  LandPlot,
  Factory,
  Hammer,
  Drill,
  Warehouse,
  Scaling,
  Gauge,
  KeyboardMusic,
  BrickWallFire,
  Cable,
  Refrigerator,
} from "lucide-react";

// Dynamic color theme generator
const useDynamicTheme = () => {
  const [theme, setTheme] = useState({
    primary: "from-blue-600 to-blue-800",
    secondary: "from-emerald-600 to-teal-700",
    accent: "from-purple-600 to-indigo-700",
  });

  useEffect(() => {
    const themes = [
      {
        primary: "from-blue-600 to-blue-800",
        secondary: "from-emerald-600 to-teal-700",
        accent: "from-purple-600 to-indigo-700",
      },
      {
        primary: "from-amber-600 to-orange-700",
        secondary: "from-rose-600 to-pink-700",
        accent: "from-violet-600 to-fuchsia-700",
      },
      {
        primary: "from-green-600 to-lime-700",
        secondary: "from-cyan-600 to-sky-700",
        accent: "from-indigo-600 to-blue-700",
      },
      {
        primary: "from-red-600 to-rose-700",
        secondary: "from-yellow-600 to-amber-700",
        accent: "from-pink-600 to-rose-700",
      },
    ];

    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  }, []);

  return theme;
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showInputModal, setShowInputModal] = useState(false);
  const [newTool, setNewTool] = useState({
    title: "",
    description: "",
    path: "",
    bgColor: "from-gray-600 to-gray-700",
    category: "structural",
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [gradientAngle, setGradientAngle] = useState(135);
  const [isMobile, setIsMobile] = useState(false);
  const theme = useDynamicTheme();

  const { scrollY } = useScroll();
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic gradient angle based on mouse position
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setGradientAngle(Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 135);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Memoized tools data for performance
  const tools = useMemo(
    () => [
      {
        title: "Bar Bending Schedule",
        description:
          "Calculate cutting length and weight of reinforcement bars with precision",
        path: "/bbs-calculator",
        icon: <Ruler size={24} className="text-blue-400" />,
        bgColor: theme.primary,
        category: "structural",
      },
      {
        title: "Brick Calculator",
        description:
          "Estimate bricks, cement, sand and mortar required for your project",
        path: "/brick-calculator",
        icon: <BrickWall size={24} className="text-emerald-400" />,
        bgColor: theme.secondary,
        category: "materials",
      },
      {
        title: "Unit Converter",
        description:
          "Convert between different construction units and measurements",
        path: "/unit-converter",
        icon: <Scaling size={24} className="text-purple-400" />,
        bgColor: theme.accent,
        category: "utilities",
      },
      {
        title: "Load Calculator",
        description:
          "Calculate dead load, live load and total load for structural analysis",
        path: "/load-calculator",
        icon: <Gauge size={24} className="text-amber-400" />,
        bgColor: "from-amber-600 to-orange-700",
        category: "structural",
      },
      {
        title: "Concrete Calculator",
        description:
          "Calculate concrete volume and materials for your construction",
        path: "/concrete-calculator",
        icon: <KeyboardMusic size={24} className="text-gray-300" />,
        bgColor: "from-gray-600 to-gray-800",
        category: "materials",
      },
      {
        title: "Steel Weight Calculator",
        description: "Calculate weight of steel bars and plates",
        path: "/steel-calculator",
        icon: <Weight size={24} className="text-red-400" />,
        bgColor: "from-red-600 to-red-800",
        category: "structural",
      },

      {
        title: "Strength Calculator",
        description: "Estimate total construction costs for your project",
        path: "/strengthcalculator",
        icon: <Calculator size={24} className="text-green-400" />,
        bgColor: "from-green-600 to-emerald-700",
        category: "utilities",
      },

      {
        title: "Surveying Calculator",
        description: "Estimate total construction costs for your project",
        path: "/surveying-calculator",
        icon: <Calculator size={24} className="text-green-400" />,
        bgColor: "from-green-600 to-emerald-700",
        category: "utilities",
      },
      {
        title: "Design Calculator",
        description: "Estimate total construction costs for your project",
        path: "/design-calculator",
        icon: <Calculator size={24} className="text-green-400" />,
        bgColor: "from-green-600 to-emerald-700",
        category: "utilities",
      },
      {
        title: "Fluid Calculator",
        description: "Estimate total construction costs for your project",
        path: "/Fluid-Calculator",
        icon: <KeyboardMusic size={24} className="text-gray-300" />,
        bgColor: "from-gray-600 to-gray-800",
        category: "materials",
      },
      
      
      
    ],
    [theme]
  );

  const filteredTools = useMemo(
    () =>
      tools.filter((tool) => {
        const matchesSearch =
          tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          activeTab === "all" || tool.category === activeTab;
        return matchesSearch && matchesCategory;
      }),
    [tools, searchTerm, activeTab]
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleAddTool = () => {
    // In a real app, you would save this to your database/state management
    setShowInputModal(false);
    setNewTool({
      title: "",
      description: "",
      path: "",
      bgColor: "from-gray-600 to-gray-700",
      category: "structural",
    });
  };

  // Category icons mapping
  const categoryIcons = {
    structural: <Refrigerator className="h-4 w-4 mr-1" />,
    materials: <BrickWall className="h-4 w-4 mr-1" />,
    utilities: <ClipboardCheck className="h-4 w-4 mr-1" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-10"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-10"
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ scale: headerScale, opacity: headerOpacity }}
          className="text-center mb-12 md:mb-16 sticky top-0 z-20 bg-gradient-to-b from-white/90 via-white/80 to-transparent pb-12 pt-4"
        >
          <motion.div
            whileHover={{
              scale: 1.03,
              boxShadow: "0 15px 30px -10px rgba(59, 130, 246, 0.3)",
            }}
            className="inline-block mb-6 relative group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Premium Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden z-0"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background:
                    "linear-gradient(270deg, #3b82f6, #8b5cf6, #ec4899, #10b981, #3b82f6)",
                  backgroundSize: "400% 400%",
                  padding: "2px",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Content */}
              <div className="flex items-center justify-center bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md rounded-full px-7 py-3.5 relative z-10 border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
                <motion.div
                  whileHover={{ rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <HardHat
                    size={26}
                    className="text-blue-600 mr-3"
                    weight="duotone"
                  />
                </motion.div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 font-semibold text-[15px] tracking-wide">
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                      backgroundImage:
                        "linear-gradient(270deg, #3b82f6, #8b5cf6, #ec4899, #8b5cf6, #3b82f6)",
                    }}
                    className="bg-clip-text text-transparent"
                  >
                    Civil Engineering Suite PRO
                  </motion.span>
                </span>
                <motion.div
                  className="absolute -right-2 -top-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-bold rounded-full px-2 py-1 shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  NEW
                </motion.div>
              </div>
            </div>

            {/* Subtletooltip effect */}
            <motion.div
              className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ y: 5 }}
            >
              Premium Engineering Tools
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              <motion.span
                className="bg-clip-text text-transparent inline-block"
                style={{
                  backgroundImage: `linear-gradient(90deg, #2563eb, #4f46e5, #7c3aed)`,
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Advanced Tools
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                for Modern Construction
              </motion.span>
            </h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Precision calculation tools designed for civil engineers and
              construction professionals
            </motion.p>

            {/* Subtle decorative elements */}
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
  className={`mb-8 sticky ${isScrolled ? "top-2" : "top-6"} z-10`}
>
  <motion.div
    className={`bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-4 md:p-6 transition-all duration-300 ${
      isScrolled ? "border border-gray-200" : "border border-transparent"
    }`}
    whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)" }}
  >
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Enhanced Search Bar */}
      <div className="flex-1">
        <motion.div 
          className="relative"
          whileFocusWithin={{ scale: 1.01 }}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <motion.div
              animate={{ 
                rotate: searchTerm ? 10 : 0,
                scale: searchTerm ? 1.1 : 1
              }}
              transition={{ type: "spring" }}
            >
              <Search className="h-5 w-5 text-gray-400" />
            </motion.div>
          </div>
          <motion.input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            whileFocus={{
              boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)"
            }}
          />
          {searchTerm && (
            <motion.button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchTerm("")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Enhanced Tabs and Add Button */}
      <div className="flex items-center space-x-2">
        <motion.div 
          className="flex rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          layout
        >
          <AnimatePresence mode="wait">
            {["all", "structural", "materials", "utilities"].map((tab) => (
              <motion.button
                key={tab}
                type="button"
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors flex items-center ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                layout
              >
                {tab === "all" && <Box className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />}
                {tab === "structural" && <Refrigerator className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />}
                {tab === "materials" && <BrickWall className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />}
                {tab === "utilities" && <ClipboardCheck className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />}
                <span className="hidden sm:inline">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
                <span className="sm:hidden">
                  {tab.charAt(0).toUpperCase()}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.button
          whileHover={{ 
            scale: 1.05,
            rotate: 5,
            backgroundColor: "#2563eb"
          }}
          whileTap={{ 
            scale: 0.95,
            rotate: -5
          }}
          className="p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center justify-center"
          onClick={() => setShowInputModal(true)}
          animate={{
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2
          }}
        >
          <Plus className="h-5 w-5" />
          <span className="hidden md:inline ml-1">Add</span>
        </motion.button>
      </div>
    </div>
  </motion.div>
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
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <Link to={tool.path} className="block h-full">
                  <div
                    className={`h-80 flex flex-col justify-between p-8 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative bg-gradient-to-br ${tool.bgColor}`}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.1 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      style={{
                        background: `radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                      }}
                    />

                    {/* Decorative grid */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEuOS0yIDItMmgxMGMxLjEgMCAyIC45IDIgMnYxMGMwIDEuMS0uOSAyLTIgMkgzOGMtMS4xIDAtMi0uOS0yLTJWMzR6TTE2IDM0YzAtMS4xLjktMiAyLTJoMTBjMS4xIDAgMiAuOSAyIDJ2MTBjMCAxLjEtLjkgMi0yIDJIMThjLTEuMSAwLTItLjktMi0yVjM0ek0xNiA0YzAtMS4xLjktMiAyLTJoMTBjMS4xIDAgMiAuOSAyIDJ2MTBjMCAxLjEtLjkgMi0yIDJIMThjLTEuMSAwLTItLjktMi0yVjR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tool.category === "structural"
                            ? "bg-blue-100 text-blue-800"
                            : tool.category === "materials"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {tool.category === "structural"
                          ? "Structural"
                          : tool.category === "materials"
                          ? "Materials"
                          : "Utilities"}
                      </span>
                    </div>

                    {/* Tool content */}
                    <div className="relative z-10">
                      <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                        {tool.icon}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        {tool.title}
                      </h2>
                      <p className="text-white/90 font-light">
                        {tool.description}
                      </p>
                    </div>

                    {/* Animated arrow */}
                    <div className="relative z-10 flex justify-between items-center">
                      <div className="text-sm font-light opacity-80">
                        Click to open
                      </div>
                      <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: 5 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <ArrowRight className="h-6 w-6" />
                      </motion.div>
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
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ClipboardCheck className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset filters
            </motion.button>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600 mr-4">
                <Factory size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Projects Completed</p>
                <p className="text-2xl font-bold text-gray-900">1,248+</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 mr-4">
                <Hammer size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Calculations Made</p>
                <p className="text-2xl font-bold text-gray-900">24,876+</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600 mr-4">
                <Drill size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">8,742+</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Calculations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">
              Recent Calculations
            </h2>
            <div className="flex space-x-3">
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                View All
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tool
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Parameters
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Result
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      tool: "Concrete Calculator",
                      icon: <KeyboardMusic className="h-5 w-5 text-gray-500" />,
                      date: "2023-05-15",
                      parameters: "Slab: 5m x 4m x 0.15m, M20 Grade",
                      result: "3.45 m³ concrete",
                      category: "materials",
                    },
                    {
                      tool: "Steel Weight Calculator",
                      icon: <Weight className="h-5 w-5 text-gray-500" />,
                      date: "2023-05-14",
                      parameters: "Round Bar: 16mm, 12m length, 5 nos",
                      result: "94.8 kg total",
                      category: "structural",
                    },
                    {
                      tool: "Brick Calculator",
                      icon: <BrickWall className="h-5 w-5 text-gray-500" />,
                      date: "2023-05-12",
                      parameters: "Wall: 10m x 3m, 230mm thick",
                      result: "4,320 bricks",
                      category: "materials",
                    },
                    {
                      tool: "Load Calculator",
                      icon: <Gauge className="h-5 w-5 text-gray-500" />,
                      date: "2023-05-10",
                      parameters: "Slab: 6m x 5m, RCC, 150mm",
                      result: "112.5 kN/m²",
                      category: "structural",
                    },
                  ].map((calc, index) => (
                    <motion.tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      whileHover={{ backgroundColor: "rgba(239, 246, 255, 1)" }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">{calc.icon}</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {calc.tool}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              {categoryIcons[calc.category]}
                              {calc.category === "structural"
                                ? "Structural"
                                : calc.category === "materials"
                                ? "Materials"
                                : "Utilities"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calc.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {calc.parameters}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {calc.result}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Add Tool Modal */}
        <AnimatePresence>
          {showInputModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Add New Tool
                  </h3>
                  <button
                    onClick={() => setShowInputModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tool Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newTool.title}
                      onChange={(e) =>
                        setNewTool({ ...newTool, title: e.target.value })
                      }
                      placeholder="e.g., Foundation Calculator"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      value={newTool.description}
                      onChange={(e) =>
                        setNewTool({ ...newTool, description: e.target.value })
                      }
                      placeholder="Brief description of what the tool does"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Path
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newTool.path}
                      onChange={(e) =>
                        setNewTool({ ...newTool, path: e.target.value })
                      }
                      placeholder="e.g., /foundation-calculator"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                          value={newTool.category}
                          onChange={(e) =>
                            setNewTool({ ...newTool, category: e.target.value })
                          }
                        >
                          <option value="structural">Structural</option>
                          <option value="materials">Materials</option>
                          <option value="utilities">Utilities</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <div className="relative">
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                          value={newTool.bgColor}
                          onChange={(e) =>
                            setNewTool({ ...newTool, bgColor: e.target.value })
                          }
                        >
                          <option value="from-blue-600 to-blue-800">
                            Blue
                          </option>
                          <option value="from-emerald-600 to-teal-700">
                            Emerald
                          </option>
                          <option value="from-purple-600 to-indigo-700">
                            Purple
                          </option>
                          <option value="from-amber-600 to-orange-700">
                            Amber
                          </option>
                          <option value="from-gray-600 to-gray-800">
                            Gray
                          </option>
                          <option value="from-red-600 to-red-800">Red</option>
                          <option value="from-indigo-600 to-blue-700">
                            Indigo
                          </option>
                          <option value="from-cyan-600 to-sky-700">Cyan</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowInputModal(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleAddTool}
                  >
                    Add Tool
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
