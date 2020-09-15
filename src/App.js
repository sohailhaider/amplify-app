import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify'
import { listTalks as ListTalks } from './graphql/queries'

function App() {
  const [talks, updateTalks] = useState([])
  
  useEffect(() => {
    getData()
  })
  
  async function getData() {
    try {
      const talkData = await API.graphql(graphqlOperation(ListTalks))
      console.log('talkData: ', talkData)
      updateTalks(talkData.data.listTalks.items)
    } catch(err) {
      console.log('error fetching talks...', err)
    }
  }
  
  return (
    <span>
        {
          talks.map((talk, index) => (
            <div key={index}>
              <h3>{talk.speakerName}</h3>
              <h5>{talk.name}</h5>
              <p>{talk.description}</p>
            </div>
          ))
        }
    </span>
  );
}

export default App;
