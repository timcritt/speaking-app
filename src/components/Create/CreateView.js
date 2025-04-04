import React from 'react';
import { Link } from 'react-router-dom';

//CSS Modules
import styles from './Create.module.css';

const CreateView = () => {
  return (
    <main className='holy-grail-content fade-in'>
      <div className={styles.all_levels_container}>
        <div className={styles.level_container}>
          <h1>FCE</h1>

          <h2>Part 1</h2>
          <Link to='/EditFCEPart2/new'>
            <h2>Part 2</h2>
          </Link>
          <Link to='EditFCEPart3/new'>
            <h2>Part 3</h2>
          </Link>
          <Link to='/EditFCEPart4/new'>
            <h2>Part 4</h2>
          </Link>
        </div>
        <div className={styles.level_container}>
          <h1>CAE</h1>
          <h2>Part 1</h2>
          <Link to='/EditCAEPart2/new'>
            <h2>Part 2</h2>
          </Link>
          <Link to='/EditCAEPart3/new'>
            <h2>Part 3</h2>
          </Link>
          <Link to='/EditCAEPart4/new'>
            <h2>Part 4</h2>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CreateView;
