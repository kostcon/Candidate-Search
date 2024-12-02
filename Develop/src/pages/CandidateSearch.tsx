import React, { useState, useEffect } from 'react';

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
}

const CandidateSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [storedCandidates, setStoredCandidates] = useState<User[]>(() => {
    const saved = localStorage.getItem('candidates');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = async () => {
    if (!searchTerm) return;

    const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
      headers: {
        Authorization: `token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`, // Replace with your token
      },
    });
    const data = await response.json();
    setUsers(data.items);
  };

  const handleSaveCandidate = (user: User) => {
    const updatedCandidates = [...storedCandidates, user];
    setStoredCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
  };

  const handleRemoveCandidate = (login: string) => {
    const updatedCandidates = storedCandidates.filter(user => user.login !== login);
    setStoredCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <input
        type="text"
        placeholder="Search for candidates"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Search Results</h2>
      <ul>
        {users.map(user => (
          <li key={user.login}>
            <img src={user.avatar_url} alt={user.login} width="50" />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
            <button onClick={() => handleSaveCandidate(user)}>Save</button>
          </li>
        ))}
      </ul>

      <h2>Stored Candidates</h2>
      <ul>
        {storedCandidates.map(user => (
          <li key={user.login}>
            <img src={user.avatar_url} alt={user.login} width="50" />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
            <button onClick={() => handleRemoveCandidate(user.login)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;