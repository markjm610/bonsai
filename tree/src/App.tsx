import React, { useEffect, useState, useContext } from 'react';
import Tree from './Tree';
import FillTree from './FillTree';
import { useMutation } from '@apollo/client'
import { CREATE_TREE } from './queries'
import Context from './Context'

function App() {
  const { setNodeOffset } = useContext(Context)

  const [treeId, setTreeId] = useState('')
  const [allowInteraction, setAllowInteraction] = useState(false)
  const [beginInsert, setBeginInsert] = useState(false)

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
    <div className="App">
      <FillTree
        treeId={treeId}
        allowInteraction={allowInteraction}
        beginInsert={beginInsert} />
      { treeId && <Tree
        treeId={treeId}
        allowInteraction={allowInteraction}
        setAllowInteraction={setAllowInteraction}
        beginInsert={beginInsert}
        setBeginInsert={setBeginInsert}
      />}
    </div>
  );
}

export default App;
