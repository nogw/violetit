import { Routes as Router, Route } from 'react-router-dom';

export const Routes = () => {
  return (
    <Router>
      <Route
        path="/"
        element={<h1 className="text-3xl font-bold underline">Hello world!</h1>}
      />
    </Router>
  );
};
