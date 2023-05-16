import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    const intervalId = setInterval(fetchUsers, 30000); // Refresh every 30 seconds
    return () => clearInterval(intervalId); // Cleanup the interval when component unmounts
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://randomuser.me/api/?results=3');
      const data = await response.json();
      setUsers(data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <h1>Random Users</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {users.map((user, index) => (
            <div key={index}>
              <img src={user.picture.medium} alt={user.name.first} />
              <p>Name: {user.name.first} {user.name.last}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
