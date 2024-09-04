/** @jsx createElement */
/** @jsxFrag Fragment */

import {Fragment, createElement} from '../common';
import {REPOS_STORE, REPOS_TABLE} from '../../stores/ReposStore';
import {Issues} from './Issues';
import {IssuesStore} from '../../stores/IssuesStore';
import {RepoHeader} from './RepoHeader';
import {useHasRow} from 'tinybase/ui-react';
import {useUiValue} from '../../stores/UiStore';

export const Repo = () =>
  useHasRow(REPOS_TABLE, useUiValue('repoId'), REPOS_STORE) ? (
    <>
      <IssuesStore />
      <RepoHeader />
      <Issues />
    </>
  ) : null;
