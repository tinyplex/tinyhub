import {
  ISSUES_STORE,
  ISSUES_TABLE,
  IssuesStore,
} from '../../stores/IssuesStore';
import React from 'react';
import {TableInHtmlTable} from 'tinybase/debug/ui-react-dom';

export const RepoMain = () => {
  return (
    <main id="repoMain">
      <IssuesStore />
      <TableInHtmlTable tableId={ISSUES_TABLE} store={ISSUES_STORE} />
    </main>
  );
};
