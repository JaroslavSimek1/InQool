import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'https://inqool-interview-api.vercel.app/api/users';

export const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await axios.get<User[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

export const addUser = async (user: { name: string; gender: 'female' | 'male' | 'other'; banned: boolean }) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const updateUser = async (id: string, updatedData: Partial<{ name: string; gender: 'female' | 'male' | 'other'; banned: boolean }>) => {
  const response = await axios.patch(`${API_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const banUser = async (id: string,banned:boolean) => {  
  const response = await axios.patch(`${API_URL}/${id}`, {'banned': banned} );
  console.log(response);
  return response.data;
};
