import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getFolder from '../APIHandlers/getFolder';
import getSomeTests from '../APIHandlers/getSomeTests';
import TestPreview from './TestPreview';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';

const ViewFolder = () => {
  const [tests, setTests] = useState(null);
  const [folderTitle, setFolderTitle] = useState(null);
  //get folder id from params
  const params = useParams();

  //custom hook: get the folder from firestore

  useEffect(() => {
    if (params) {
      const fetchTests = async () => {
        const folder = await getFolder(params.folderId);
        setFolderTitle(folder.title);
        const newTests = await getSomeTests(folder.tests);
        console.log(newTests);
        setTests(newTests);
      };
      fetchTests();
    }
  }, [params]);

  return (
    <Fragment>
      <main className='holy-grail-content fade-in'>
        <div className='my-content-content'>
          <div className='dashboard-container'>
            <div className='dashboard-profile-pic-container'>
              <FolderOutlinedIcon className='folder-summary-icon' />
            </div>
            <div className='dashboard-main'>
              <div className='dashboard-user-info'>
                <span className='dashboard-user-name'>{folderTitle}</span>
              </div>
            </div>
          </div>
          <div className='view-folder-container'>
            {tests &&
              tests.map((test) => {
                return <TestPreview key={test.id} test={test} />;
              })}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ViewFolder;
