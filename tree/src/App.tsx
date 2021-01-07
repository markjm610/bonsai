import React, { useEffect, useState, useContext } from 'react';
import Tree from './Tree';
import FillTree from './FillTree';
import { useMutation } from '@apollo/client'
import { CREATE_TREE } from './queries'
import Context from './Context'

function App() {
  const { setNodeOffset } = useContext(Context)

  const [treeId, setTreeId] = useState('')
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
        beginInsert={beginInsert} />
      { treeId && <Tree
        treeId={treeId}
        beginInsert={beginInsert}
        setBeginInsert={setBeginInsert}
      />}
    </div>
  );
}

export default App;
