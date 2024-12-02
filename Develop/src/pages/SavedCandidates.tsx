import React, { useEffect, useState } from 'react';

// Define the structure of a Candidate
interface Candidate {
  id: string;
  name: string;
  email: string;
}

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Retrieve saved candidates from local storage
    const candidates = localStorage.getItem('savedCandidates');
    if (candidates) {
      setSavedCandidates(JSON.parse(candidates));
    }
  }, []);

  const handleRemoveCandidate = (candidateId: string) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== candidateId);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates found.</p>
      ) : (
        <ul>
          {savedCandidates.map(candidate => (
            <li key={candidate.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
              <h2>{candidate.name}</h2>
              <p>Email: {candidate.email}</p>
              <button onClick={() => handleRemoveCandidate(candidate.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;