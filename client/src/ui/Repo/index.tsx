/** @jsx createElement */
/** @jsxFrag Fragment */

import {Fragment, createElement} from '../../common';
import {Issues} from './Issues';
import {RepoHeader} from './RepoHeader';
import {useRepoCell} from '../../stores/ReposStore';
import {useUiValue} from '../../stores/UiStore';

export const Repo = () =>
  useRepoCell(useUiValue('repoId'), 'name') ? (
    <>
      <RepoHeader />
      <Issues />
    </>
  ) : null;
