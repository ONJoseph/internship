import React from 'react';
import TodoForm from '../TodoForm';
import TodoList from '../TodoList';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default Dashboard;
