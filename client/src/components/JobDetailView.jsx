import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Header = styled.header`
  background-color: #340487;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  border-radius: 8px 8px 0 0;
`;

const MainContent = styled.main`
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const Sidebar = styled.aside`
  background: linear-gradient(180deg, #f9f9f9, #e9e9e9);
  padding: 20px;
  border-radius: 0 0 8px 8px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const ApplyButton = styled.button`
  background-color: #340487;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #290362;
  }
`;

const JobDetailView = ({ job }) => {
  const history = useHistory();

  const handleSaveJob = () => {
    // Implement save job functionality
    alert('Job saved!'); // Notify user
  };

  const handleApplyNow = () => {
    history.push(`/apply/${job.id}`);
  };

  return (
    <Container>
      <Header>
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>
        <button aria-label="Save Job" onClick={handleSaveJob}>
          💾
        </button>
      </Header>
      <MainContent>
        <h3>Job Description</h3>
        <p>{job.description}</p>
        <h3>Requirements</h3>
        <p>{job.requirements}</p>
        <h3>Benefits</h3>
        <p>{job.benefits}</p>
        <h3>Application Instructions</h3>
        <p>{job.applicationInstructions}</p>
      </MainContent>
      <Sidebar>
        <h3>Related Jobs</h3>
        <ul>
          {job.relatedJobs.map((relatedJob) => (
            <li key={relatedJob.id}>
              <a href={`/jobs/${relatedJob.id}`} aria-label={`View job detail for ${relatedJob.title}`}>
                {relatedJob.title}
              </a>
            </li>
          ))}
        </ul>
        <ApplyButton onClick={handleApplyNow}>
          Apply Now
        </ApplyButton>
      </Sidebar>
    </Container>
  );
};

export default JobDetailView;