import { Switch, Route } from 'react-router-dom';
import MyTests from 'components/CreatorContent/MyTests';
import MyFolders from 'components/CreatorContent/MyFolders';
import FolderSummary from 'components/common/FolderSummary';

const ContentRoutes = ({ url, creatorId }) => {
  return (
    <Switch>
      <Route exact path={`${url}/folders`}>
        <MyFolders
          FolderList={FolderSummary}
          creatorId={creatorId ? creatorId : ''}
        />
      </Route>
      <Route exact path={`${url}/tests`}>
        <MyTests creatorId={creatorId ? creatorId : ''} />
      </Route>
    </Switch>
  );
};

export default ContentRoutes;
