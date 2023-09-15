import React from 'react';
import './App.css';
import  "./components/Sidebar.css";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';

function App() {
  return (
    <div className='app'>
      <Sidebar />
      {/* Feed section */}
      <Feed />
      {/* Widget section */}
      <Widgets />
    </div>
  );
}

export default App;
