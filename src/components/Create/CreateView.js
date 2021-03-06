import React from 'react';
import { Link } from 'react-router-dom';

const CreateView = () => {
  return (
    <main className='holy-grail-content fade-in'>
      <div className='create-all-levels-container'>
        <div className='create-single-level-container'>
          <h1>FCE</h1>

          <h2>Part 1</h2>
          <Link to='/EditFCEPart2/new'>
            <h2>Part 2</h2>
          </Link>
          <Link to='EditFCEPart3/new'>
            <h2>Part 3</h2>
          </Link>
          <h2>Part 4</h2>
        </div>
        <div className='create-single-level-container'>
          <h1>CAE</h1>
          <h2>Part 1</h2>
          <h2>Part 2</h2>
          <h2>Part 3</h2>
          <h2>Part 4</h2>
        </div>
      </div>
    </main>
  );
};

export default CreateView;
