import {
  REPOS_FULL_NAME_CELL,
  REPOS_STORE,
  REPOS_TABLE,
} from '../../stores/ReposStore';
import {REPO_ID, UI_STORE} from '../../stores/UiStore';
import React, {useCallback, useState} from 'react';
import {
  useSetPartialRowCallback,
  useSetValueCallback,
} from 'tinybase/debug/ui-react';
import {useModal} from '../common/Modal';

const VALID_REPO_FULL_NAME = /^[0-9a-zA-Z_.-]+\/[0-9a-zA-Z_.-]+$/;

const DEFAULT_REPO_FULL_NAME = 'tinyplex/tinybase';

export const RepoAdd = () => {
  const [Modal, showModal, hideModal] = useModal();

  const [repoFullName, setRepoFullName] = useState('');
  const [error, setError] = useState(false);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const repoFullName = event.target.value;
      setRepoFullName(repoFullName);
      setError(repoFullName != '' && !VALID_REPO_FULL_NAME.test(repoFullName));
    },
    [],
  );

  const addRepo = useSetPartialRowCallback(
    REPOS_TABLE,
    (repoFullName: string) => repoFullName,
    (repoFullName: string) => ({[REPOS_FULL_NAME_CELL]: repoFullName}),
    [],
    REPOS_STORE,
  );

  const setCurrentRepoId = useSetValueCallback(
    REPO_ID,
    (repoFullName: string) => repoFullName,
    [repoFullName],
    UI_STORE,
  );

  const handleRepoAdd = useCallback(() => {
    const defaultedRepoId =
      repoFullName == '' ? DEFAULT_REPO_FULL_NAME : repoFullName;
    addRepo(defaultedRepoId);
    setCurrentRepoId(defaultedRepoId);
    setRepoFullName('');
    hideModal();
  }, [repoFullName, addRepo, setCurrentRepoId, hideModal]);

  return (
    <>
      <button onClick={showModal} className="repoAdd">
        Add repo
      </button>
      <Modal title="Add repo" onDefault={handleRepoAdd} onCancel={hideModal}>
        <p>Enter the full name of the repo to add.</p>
        <div id="buttons">
          <input
            type="text"
            value={repoFullName}
            onChange={handleNameChange}
            placeholder="tinyplex/tinybase"
            autoFocus
            className={error ? 'error' : ''}
          />
          <button onClick={handleRepoAdd} disabled={error}>
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};
