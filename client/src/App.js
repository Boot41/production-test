import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import EmployerDashboard from './pages/EmployerDashboard'; 
import JobSearchPage from './pages/JobSearchPage'; 
import JobDetailPage from './pages/JobDetailPage'; 
import JobApplicationPage from './pages/JobApplicationPage'; 
import ApplicationTrackingPage from './pages/ApplicationTrackingPage'; 
import EditApplicationPage from './pages/EditApplicationPage'; 
import ApplicantManagementPage from './pages/ApplicantManagementPage'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/job-search" element={<JobSearchPage />} />
          <Route path="/job-detail" element={<JobDetailPage />} />
          <Route path="/job-application" element={<JobApplicationPage />} />
          <Route path="/application-tracking" element={<ApplicationTrackingPage />} />
          <Route path="/edit-application" element={<EditApplicationPage />} />
          <Route path="/applicant-management" element={<ApplicantManagementPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;