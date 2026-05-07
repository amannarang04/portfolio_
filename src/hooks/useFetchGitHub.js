import { useState, useEffect } from 'react';

export const useFetchGitHub = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        // Using sort=updated to get the most recently updated repos first
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub repositories');
        }

        const data = await response.json();
        
        // Filter out forks if desired, or just map the needed fields
        const formattedRepos = data
          .filter(repo => !repo.fork) // typically you don't show forks on portfolio
          .map(repo => ({
            id: repo.id,
            name: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
            description: repo.description || 'No description provided.',
            html_url: repo.html_url,
            homepage: repo.homepage,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language || 'Markdown',
            updated_at: repo.updated_at,
          }));

        setRepos(formattedRepos);
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRepos();
    }
  }, [username]);

  return { repos, loading, error };
};
