import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/ pages/Home';
import BBSCalculator from './components/ pages/BBSCalculator';
import BrickCalculator from './components/ pages/BrickCalculator';
import UnitConverter from './components/ pages/UnitConverter';
import LoadCalculator from './components/ pages/LoadCalculator';
import ConcreteCalculator from './components/ pages/ConcreteCalculator';
import SteelCalculator from './components/ pages/SteelCalculator';
import StrengthCalculator from './components/ pages/StrengthCalculator';
import SurveyingCalculator from './components/ pages/SurveyingCalcutator';
import DesignCalculator from './components/ pages/DesignCalculator';
import FluidMechanicsCalculator from './components/ pages/FluidCalculator';

// import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
          
            {/* Home Page */}
            <Route path="/" element={<Home />} />
            
            {/* Calculator Routes */}
            <Route path="/bbs-calculator" element={<BBSCalculator />} />
            <Route path="/brick-calculator" element={<BrickCalculator />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/load-calculator" element={<LoadCalculator />} />
            <Route path="/concrete-calculator" element={<ConcreteCalculator />} />
            <Route path="/steel-calculator" element={<SteelCalculator />} />
            <Route path="/strength-calculator" element={<StrengthCalculator />} />
            <Route path="/surveying-calculator" element={<SurveyingCalculator />} />
            <Route path="/design-calculator" element={<DesignCalculator />} />
            <Route path="/Fluid-Calculator" element={<FluidMechanicsCalculator />} />
            
            
            {/* 404 Page */}
            
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
        
       
      </div>
    </Router>
  );
}

export default App;