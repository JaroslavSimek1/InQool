import React from 'react';
import { Link } from 'react-router-dom';
import useAnimals from '../hooks/useAnimals';
import AnimalTable from '../components/AnimalTable';
import Loader from '../components/Loader';

const AnimalsPage: React.FC = () => {
  const { animals: initialAnimals, loading, error } = useAnimals();

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container-fluid">
      <div className="row padding align-sm-height">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <Link to="/" className="btn btn-dark mt-2 mt-md-0">Home</Link>
          <h1 className="mb-0">Animals</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <AnimalTable animals={initialAnimals} />
        </div>
      </div>
    </div>
  );
};

export default AnimalsPage;
