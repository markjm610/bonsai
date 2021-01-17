import React, { useEffect, useState, useContext } from 'react';
import Tree from './Tree';
import FillTree from './FillTree';
import { useMutation } from '@apollo/client'
import { CREATE_TREE } from './queries'
import ButtonBar from './ButtonBar';
import { determineClassName } from './utils';
import Context from './Context';
import Instructions from './Instructions';


function App() {
  const { barPosition } = useContext(Context)
  const [treeId, setTreeId] = useState('')

  const [createTree, { data: newTree }] = useMutation(CREATE_TREE)


  useEffect(() => {

    const storedTreeId: string | null = localStorage.getItem('TREE_ID')

    if (storedTreeId) {
      setTreeId(storedTreeId)
    } else {
      // Send mutation that creates tree
      // setTreeId in state and setItem in local storage

      createTree()


    }

  }, [])

  useEffect(() => {
    if (newTree) {
      localStorage.setItem('TREE_ID', newTree.createTree.id)
      setTreeId(newTree.createTree.id)
    }
  }, [newTree])

  return (
    <div className={determineClassName('layout', barPosition)}>
      <ButtonBar treeId={treeId} />
      <div className={determineClassName('rest-of-page', barPosition)}>
        <FillTree
          treeId={treeId}
        />
        {treeId && <Tree
          treeId={treeId}
        />}
      </div>
    </div>
  );
}

export default App;
