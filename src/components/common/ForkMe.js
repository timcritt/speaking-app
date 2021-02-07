import React from 'react';
import GitHubForkRibbon from 'react-github-fork-ribbon';
const ForkRibbon = () => {
  return (
    <GitHubForkRibbon
      position='right-bottom'
      color='orange'
      href='https://github.com/timcritt/speaking-app'
      target='_blank'
    >
      Fork me on GitHub
    </GitHubForkRibbon>
  );
};

export default ForkRibbon;
