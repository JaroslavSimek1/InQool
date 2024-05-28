import { useState, useEffect } from 'react';
import { fetchUsers } from '../services/userService';
import { User } from '../types/User';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, loading, error };
};

export default useUsers;
