import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import EmployerDashboard from './pages/EmployerDashboard'; 
import JobSearchPage from './pages/JobSearchPage'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/job-search" element={<JobSearchPage />} />
          {/* Add other routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;