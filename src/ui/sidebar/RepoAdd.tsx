import {REPOS_STORE, REPOS_TABLE} from '../../stores/ReposStore';
import React, {useCallback, useState} from 'react';
import {useModal} from '../common/Modal';
import {useSetRowCallback} from 'tinybase/debug/ui-react';

export const RepoAdd = () => {
  const [Modal, showModal, hideModal] = useModal();

  const [repoId, setRepoId] = useState('');

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setRepoId(event.target.value),
    [],
  );

  const addRepo = useSetRowCallback(
    REPOS_TABLE,
    (repoId: string) => repoId,
    (repoId: string) => ({name: repoId}),
    [],
    REPOS_STORE,
  );

  const handleRepoAdd = useCallback(() => {
    if (repoId != '') {
      addRepo(repoId);
      setRepoId('');
    }
    hideModal();
  }, [addRepo, repoId, hideModal]);

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
          />
          <button onClick={handleRepoAdd}>OK</button>
        </div>
      </Modal>
    </>
  );
};
