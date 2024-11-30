import React from 'react';
import CompanyList from './components/CompanyList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow mb-8">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Equity Manager
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4">
        <CompanyList />
      </main>
    </div>
  );
};

export default App;