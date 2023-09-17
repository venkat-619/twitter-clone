import React from 'react';
import './App.css';
import  "./components/Sidebar.css";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';

function App({photo}) {
  return (
    <div className='app'>
      <Sidebar />
      {/* Feed section */}
      <Feed photo={photo}/>
      {/* Widget section */}
      <Widgets />
    </div>
  );
}

export default App;
