import React, { Fragment, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import getFolder from '../APIHandlers/getFolder';
import getSomeTests from '../APIHandlers/getSomeTests';
import TestPreview from './TestPreview';

const ViewFolder = () => {
  const [tests, setTests] = useState(null);

  //get folder id from params
  const params = useParams();

  //custom hook: get the folder from firestore

  useEffect(() => {
    const fetchTests = async () => {
      const folder = await getFolder(params.folderId);
      const newTests = await getSomeTests(folder.tests);
      console.log(newTests);
      setTests(newTests);
    };
    fetchTests();
  }, [params]);

  return (
    <Fragment>
      <main className='holy-grail-content fade-in'>
        <div className='my-content-content'>
          {tests &&
            tests.map((test) => {
              return <TestPreview key={test.id} test={test} />;
            })}
        </div>
      </main>
    </Fragment>
  );
};

export default ViewFolder;
