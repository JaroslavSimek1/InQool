import axios from 'axios';
import { Animal } from '../types/Animal';

const API_URL = 'https://inqool-interview-api.vercel.app/api/animals';

export const fetchAnimals = async (): Promise<Animal[]> => {
    try {
      const response = await axios.get<Animal[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching animals:', error);
      throw error;
    }
  };

export const addAnimal = async (animal: { name: string; type: 'cat' | 'dog' | 'other'; age: number }) => {
  const response = await axios.post(API_URL, animal);
  return response.data;
};

export const updateAnimal = async (id: string, updatedData: Partial<{ name: string; type: 'cat' | 'dog' | 'other'; age: number }>) => {
  const response = await axios.patch(`${API_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteAnimal = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};