/* src/App.js */
import React, { useEffect, useState } from 'react'
import {Amplify, API, graphqlOperation,Storage} from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const App = () => {
  const [fileData,setFileData] = useState()
  const [fileStatus,setFileStatus] = useState(false)

  const uploadFile = async () => {
    const result = await Storage.put(fileData.name,fileData,{contentType:fileData.type})
    setFileStatus(true)
  }

  return (
    <Authenticator signUpAttributes={["email"]}>
    {({ signOut, user }) => (
    <div style={styles.container}>
      <div>
        <p>{user.username}</p>
        <button onClick={signOut}>sing out</button>
      </div>
      <h2>Amplify Todos</h2>
      <input type="file" onChange={(e)=>setFileData(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
      {fileStatus ? "Uploaded Successfully!!" : ""}
    </div>
    )}
    </Authenticator>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App