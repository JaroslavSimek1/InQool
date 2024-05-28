import { useState, useEffect } from 'react';
import { fetchAnimals } from '../services/animalService';
import { Animal } from '../types/Animal';

const useAnimals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getAnimals = async () => {
      try {
        const animalsData = await fetchAnimals();
        setAnimals(animalsData);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    getAnimals();
  }, []);

  return { animals, loading, error };
};

export default useAnimals;
