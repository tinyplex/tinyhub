/** @jsx createElement */
/** @jsxFrag Fragment */

import {Fragment, createElement} from '../common';
import {REPOS_STORE, REPOS_TABLE} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import {useHasRow, useValue} from 'tinybase/ui-react';
import {Issues} from './Issues';
import {IssuesStore} from '../../stores/IssuesStore';
import {RepoHeader} from './RepoHeader';

export const Repo = () => {
  const repoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';
  const hasRepo = useHasRow(REPOS_TABLE, repoId, REPOS_STORE);

  return hasRepo ? (
    <>
      <IssuesStore />
      <RepoHeader />
      <Issues />
    </>
  ) : null;
};
