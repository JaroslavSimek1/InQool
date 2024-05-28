import React, { useState, useEffect } from 'react';
import { Animal } from '../types/Animal';
import { fetchAnimals, addAnimal, updateAnimal, deleteAnimal } from '../services/animalService';

interface AnimalTableProps {
  animals: Animal[];
}

const AnimalTable: React.FC<AnimalTableProps> = ({ animals: initialAnimals }) => {
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [filter, setFilter] = useState('');
  const [editingAnimalId, setEditingAnimalId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState<'cat' | 'dog' | 'other'>('cat');
  const [editAge, setEditAge] = useState(0);
  const [newAnimalName, setNewAnimalName] = useState('');
  const [newAnimalType, setNewAnimalType] = useState<'cat' | 'dog' | 'other'>('cat');
  const [newAnimalAge, setNewAnimalAge] = useState(0);

  useEffect(() => {
    setAnimals(initialAnimals);
  }, [initialAnimals]);

  const handleDelete = async (id: string) => {
    await deleteAnimal(id);
    await fetchAndSetAnimals();
  };

  const handleEdit = async (id: string) => {
    setEditingAnimalId(id);
    const animalToEdit = animals.find(animal => animal.id === id);
    if (animalToEdit) {
      setEditName(animalToEdit.name);
      setEditType(animalToEdit.type);
      setEditAge(animalToEdit.age);
    }
  };

  const handleSaveEdit = async () => {
    if (editingAnimalId) {
      try {
        await updateAnimal(editingAnimalId, { name: editName, type: editType, age: editAge });
        await fetchAndSetAnimals();
        setEditingAnimalId(null);
      } catch (error) {
        console.error('Error updating animal:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingAnimalId(null);
    setEditName('');
    setEditType('cat');
    setEditAge(0);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const fetchAndSetAnimals = async () => {
    try {
      const updatedAnimals = await fetchAnimals();
      setAnimals(updatedAnimals);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  const handleAddAnimal = async () => {
    try {
      const newAnimal = {
        name: newAnimalName,
        type: newAnimalType,
        age: newAnimalAge
      };
      await addAnimal(newAnimal);
      await fetchAndSetAnimals();
      setNewAnimalName('');
      setNewAnimalType('cat');
      setNewAnimalAge(0);
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        value={filter}
        onChange={e => handleFilterChange(e.target.value)}
        placeholder="Filter by name"
        className="form-control mb-3"
      />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnimals.map((animal) => (
            <tr key={animal.id}>
              <td>
                {editingAnimalId === animal.id ? (
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  animal.name
                )}
              </td>
              <td>
                {editingAnimalId === animal.id ? (
                  <select
                    value={editType}
                    onChange={e => setEditType(e.target.value as 'cat' | 'dog' | 'other')}
                    className="form-control"
                  >
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  animal.type
                )}
              </td>
              <td>
                {editingAnimalId === animal.id ? (
                  <input
                    type="number"
                    value={editAge}
                    onChange={e => setEditAge(parseInt(e.target.value))}
                    className="form-control"
                  />
                ) : (
                  animal.age
                )}
              </td>
              <td>
                {editingAnimalId === animal.id ? (
                  <>
                    <button className="btn btn-success me-2" onClick={handleSaveEdit}>Save</button>
                    <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary me-2" onClick={() => handleEdit(animal.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(animal.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={newAnimalName}
                onChange={e => setNewAnimalName(e.target.value)}
                className="form-control"
                placeholder="Name"
              />
            </td>
            <td>
              <select
                value={newAnimalType}
                onChange={e => setNewAnimalType(e.target.value as 'cat' | 'dog' | 'other')}
                className="form-control"
              >
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="other">Other</option>
              </select>
            </td>
            <td>
              <input
                type="number"
                value={newAnimalAge}
                onChange={e => setNewAnimalAge(parseInt(e.target.value))}
                className="form-control"
              />
            </td>
            <td>
              <button className="btn btn-primary" onClick={handleAddAnimal}>Add Animal</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnimalTable;
