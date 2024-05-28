import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import AnimalsPage from './pages/AnimalsPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/animals" element={<AnimalsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
