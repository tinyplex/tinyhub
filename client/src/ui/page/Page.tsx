import {REPOS_STORE, REPOS_TABLE} from '../../stores/ReposStore';
import {REPO_ID_VALUE, UI_STORE} from '../../stores/UiStore';
import {useHasRow, useValue} from 'tinybase/debug/ui-react';
import React from 'react';
import {Repo} from './Repo';

export const Page = () => {
  const currentRepoId = (useValue(REPO_ID_VALUE, UI_STORE) as string) ?? '';
  const hasRepo = useHasRow(REPOS_TABLE, currentRepoId, REPOS_STORE);

  return <div id="page">{hasRepo ? <Repo /> : null}</div>;
};
