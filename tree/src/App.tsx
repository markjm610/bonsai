import React from 'react';
import InsertForm from './InsertForm';
import Leaf from './Leaf';

function App() {
  return (
    <div className="App">
      <InsertForm />
      <Leaf value={100} />
    </div>
  );
}

export default App;
