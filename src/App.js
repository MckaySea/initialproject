// src/App.js
import React from 'react';

// imports from Amplify library
import Amplify, { API, graphqlOperation } from 'aws-amplify'

// import query definition
import { listLitCases as ListLitCases } from './graphql/queries'

import { withAuthenticator } from '@aws-amplify/ui-react';

import uuid from 'react-uuid'

import awsExports from './aws-exports';

import { createLitCase as CreateLitCase } from './graphql/mutations'

const CLIENT_ID = uuid();

Amplify.configure(awsExports);

class App extends React.Component {
  // define some state to hold the data returned from the API
  state = {
    name: '', description: '', attorName: '', deadline: '', status: '', nextstep: '',LitCases: []
  }

  // execute the query in componentDidMount
  async componentDidMount() {
    try {
      const litData = await API.graphql(graphqlOperation(ListLitCases))
      console.log('litData:', litData)
      this.setState({
        LitCases: litData.data.listLitCases.items
      })
    } catch (err) {
      console.log('error fetching lit data...', err)
    }
  }
  createLitCase = async() => {
    const { name, description, attorName, deadline, status, nextstep } = this.state
    if (name === '' || description === '' || attorName === '' || deadline === '' || status === '' || nextstep === '') return

    const LitCase = { name, description, attorName, deadline, status, nextstep,  clientId: CLIENT_ID }
    const LitCases = [...this.state.LitCases, LitCase]
    this.setState({
      LitCases,  name: '', description: '', attorName: '', deadline: '', status: '', nextstep: ''
    })

    try {
      await API.graphql(graphqlOperation(CreateLitCase, { input: LitCase }))
      console.log('item created!')
    } catch (err) {
      console.log('error creating LitCase...', err)
    }
  }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <>
        <input
          name='name'
          onChange={this.onChange}
          value={this.state.name}
          placeholder='name'
        />
        <input
          name='description'
          onChange={this.onChange}
          value={this.state.description}
          placeholder='description'
        />
        <input
          name='attorName'
          onChange={this.onChange}
          value={this.state.attorName}
          placeholder='Attorney Name'
        />
        <input
          name='deadline'
          onChange={this.onChange}
          value={this.state.deadline}
          placeholder='deadline'
        />
         <input
          name='status'
          onChange={this.onChange}
          value={this.state.status}
          placeholder='status'
        />
        <input
          name='nextstep'
          onChange={this.onChange}
          value={this.state.nextstep}
          placeholder='nextstep'
        />
        <button onClick={this.createLitCase}>Create LitCase</button>
        {
          this.state.LitCases.map((LitCase, index) => (
            <div key={index}>
              <h3>{LitCase.speakerName}</h3>
              <h5>{LitCase.name}</h5>
              <p>{LitCase.description}</p>
            </div>
          ))
        }
      </>
    )
  }
}

export default App