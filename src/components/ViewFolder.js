import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getFolder from '../APIHandlers/getFolder';
import getSomeTests from '../APIHandlers/getSomeTests';
import TestPreview from './TestPreview';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import CreatorInfo from './CreatorInfo';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

const ViewFolder = () => {
  const [tests, setTests] = useState(null);
  const [folderTitle, setFolderTitle] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [creatorName, setCreatorName] = useState(null);
  //get folder id from params
  const params = useParams();

  //get the folder from firestore

  useEffect(() => {
    if (params) {
      const fetchTests = async () => {
        const folder = await getFolder(params.folderId);
        setFolderTitle(folder.title);
        setCreatorId(folder.userId);
        setCreatorName(folder.authorName);
        const newTests = await getSomeTests(folder.tests);
        setTests(newTests);
      };
      fetchTests();
    }
  }, [params]);

  return (
    <Fragment>
      <main className='holy-grail-content fade-in centre-vertically'>
        <div className='view-folder-container'>
          <div className='view-folder-header'>
            <FolderOutlinedIcon className='folder-summary-icon' />
            <span className='dashboard-user-name'>{folderTitle}</span>
            <span className='close-folder-button'>
              <Link className='nav-link' to={'/tests'}>
                <CloseIcon />
              </Link>
            </span>
          </div>
          <div className='view-folder-folder-row'>
            {tests &&
              tests.map((test) => {
                return <TestPreview key={test.id} test={test} />;
              })}
          </div>
          <div className='tool-bar-row'>
            {creatorId && <CreatorInfo authorId={creatorId} />}

            <div className='tool-btn-container'>
              <button className='tool-bar-btn'>
                <ShareOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ViewFolder;
