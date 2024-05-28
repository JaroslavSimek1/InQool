import React, { useState, useEffect } from 'react';
import { User } from '../types/User';
import { banUser, deleteUser, fetchUsers, updateUser, addUser as addUserService } from '../services/userService';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users: initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filter, setFilter] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editGender, setEditGender] = useState<'female' | 'male' | 'other'>('male');
  const [newUserName, setNewUserName] = useState('');
  const [newUserGender, setNewUserGender] = useState<'female' | 'male' | 'other'>('male');
  const [newUserBanned, setNewUserBanned] = useState(false);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    await fetchAndSetUsers();
  };

  const handleEdit = async (id: string) => {
    setEditingUserId(id);
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setEditName(userToEdit.name);
      setEditGender(userToEdit.gender);
    }
  };

  const handleSaveEdit = async () => {
    if (editingUserId) {
      try {
        await updateUser(editingUserId, { name: editName, gender: editGender });
        await fetchAndSetUsers();
        setEditingUserId(null);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditName('');
    setEditGender('male');
  };

  const handleBan = async (id: string, banned: boolean) => {
    await banUser(id, banned);
    await fetchAndSetUsers();
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const fetchAndSetUsers = async () => {
    try {
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddUser = async () => {
    try {
      const newUser = {
        name: newUserName,
        gender: newUserGender,
        banned: newUserBanned
      };
      await addUserService(newUser);
      await fetchAndSetUsers();
      setNewUserName('');
      setNewUserGender('male');
      setNewUserBanned(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        value={filter}
        onChange={e => handleFilterChange(e.target.value)}
        className="form-control mb-3"
        placeholder="Filter by name"
      />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Banned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <select
                    value={editGender}
                    onChange={e => setEditGender(e.target.value as 'female' | 'male' | 'other')}
                    className="form-control"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  user.gender
                )}
              </td>
              <td>{user.banned ? 'Yes' : 'No'}</td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button className="btn btn-success me-2" onClick={handleSaveEdit}>Save</button>
                    <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary me-2" onClick={() => handleEdit(user.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                    {user.banned ? (
                      <button className="btn btn-warning ms-2" onClick={() => handleBan(user.id, false)}>Unban</button>
                    ) : (
                      <button className="btn btn-warning ms-2" onClick={() => handleBan(user.id, true)}>Ban</button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
                className="form-control"
                placeholder="Name"
              />
            </td>
            <td>
              <select
                value={newUserGender}
                onChange={e => setNewUserGender(e.target.value as 'female' | 'male' | 'other')}
                className="form-control"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                checked={newUserBanned}
                onChange={e => setNewUserBanned(e.target.checked)}
              />
            </td>
            <td>
              <button className="btn btn-primary" onClick={handleAddUser}>Add User</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
