import React, { useEffect, useState, useContext } from 'react';
import Tree from './Tree';
import FillTree from './FillTree';
import { useMutation } from '@apollo/client'
import { CREATE_TREE } from './queries'
import ButtonBar from './ButtonBar';

function App() {

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
    <div className="layout">
      <ButtonBar treeId={treeId} />
      <div>
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
