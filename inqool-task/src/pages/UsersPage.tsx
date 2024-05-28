import React from 'react';
import { Link } from 'react-router-dom';
import useUsers from '../hooks/useUsers';
import UserTable from '../components/UserTable';
import Loader from '../components/Loader';

const UsersPage: React.FC = () => {
  const { users: initialUsers, loading, error } = useUsers();

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container-fluid">
      <div className="row padding align-sm-height">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <Link to="/" className="btn btn-dark mt-2 mt-md-0">Home</Link>
          <h1 className="mb-0">Users</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <UserTable users={initialUsers} />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
