import React, {useCallback, useState} from 'react';
import {useModal} from './common/Modal';

export const RepoAdd = () => {
  const [Modal, showModal, hideModal] = useModal();

  const [name, setName] = useState('');

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    [],
  );

  const handleRepoAdd = useCallback(() => {
    if (name != '') {
      // eslint-disable-next-line no-console
      console.log('adding', name);
      setName('');
    }
    hideModal();
  }, [name, hideModal]);

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
            value={name}
            onChange={handleNameChange}
            placeholder="tinyplex/tinybase"
          />
          <button onClick={handleRepoAdd}>OK</button>
        </div>
      </Modal>
    </>
  );
};
