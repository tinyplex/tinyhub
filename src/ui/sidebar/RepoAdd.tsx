import {REPOS_STORE, REPOS_TABLE} from '../../stores/ReposStore';
import {REPO_ID, UI_STORE} from '../../stores/UiStore';
import React, {useCallback, useState} from 'react';
import {
  useSetPartialRowCallback,
  useSetValueCallback,
} from 'tinybase/debug/ui-react';
import {useModal} from '../common/Modal';

const VALID_REPO_ID = /^[0-9a-zA-Z_.-]+\/[0-9a-zA-Z_.-]+$/;

const DEFAULT_REPO_ID = 'tinyplex/tinybase';

export const RepoAdd = () => {
  const [Modal, showModal, hideModal] = useModal();

  const [repoId, setRepoId] = useState('');
  const [error, setError] = useState(false);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const repoId = event.target.value;
      setRepoId(repoId);
      setError(repoId != '' && !VALID_REPO_ID.test(repoId));
    },
    [],
  );

  const addRepo = useSetPartialRowCallback(
    REPOS_TABLE,
    (repoId: string) => repoId,
    (repoId: string) => ({name: repoId}),
    [],
    REPOS_STORE,
  );

  const setCurrentRepoId = useSetValueCallback(
    REPO_ID,
    (repoId: string) => repoId,
    [repoId],
    UI_STORE,
  );

  const handleRepoAdd = useCallback(() => {
    const defaultedRepoId = repoId == '' ? DEFAULT_REPO_ID : repoId;
    addRepo(defaultedRepoId);
    setCurrentRepoId(defaultedRepoId);
    setRepoId('');
    hideModal();
  }, [repoId, addRepo, setCurrentRepoId, hideModal]);

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
            value={repoId}
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
