// src/App.js
import React, { useEffect, useReducer } from "react";

// imports from Amplify library
import Amplify, { API, graphqlOperation } from 'aws-amplify'

// import query definition
import { listLitCases as ListLitCases } from './graphql/queries'

import { withAuthenticator } from '@aws-amplify/ui-react';

import uuid from 'react-uuid'

import awsExports from './aws-exports';

import { createLitCase as CreateLitCase } from './graphql/mutations'

Amplify.configure(awsExports);

const CLIENT_ID = uuid();

const initialState = {
	name: "",
	description: "",
	speakerName: "",
	speakerBio: "",
	LitCases: [],
};
function reducer(state, action) {
	switch (action.type) {
		case "SET_LITCASE":
			return {
				...state,
				LitCases: action.LitCases,
			};
		case "SET_INPUT":
			return {
				...state,
				[action.key]: action.value,
			};
		case "CLEAR-INPUT":
			return {
				...initialState,
				LitCases: state.LitCases,
			};

		default:
			return state;
	}
}

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// execute the query in
	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const litData = await API.graphql(graphqlOperation(ListLitCases));
			console.log("litData: ", litData);
			dispatch({ type: "SET_LITCASE", LitCases: litData.data.listLitCases.items });
		} catch (err) {
			console.log("Error fetching data : ", err);
		}
	};

	const createLitCase = async () => {
		const { name, description, deadline, nextstep } = state;
		if (
			name === "" ||
			description === "" ||
			deadline === "" ||
			nextstep === ""
		)
			return;
		const LitCase = {
			name,
			description,
			deadline,
			nextstep,
			clientID: CLIENT_ID,
		};
		let LitCases = [...state.LitCases, LitCase];
		dispatch({ type: "SET_LITCASE", LitCases });
		dispatch({ type: "CLEAR INPUT" });

		try {
			await API.graphql(
				graphqlOperation(CreateLitCase, {
					input: LitCase,
				})
			);
			console.log("item created!");
		} catch (err) {
			console.log("error creating talk...", err);
		}
	};

	const onChange = (e) => {
		dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
	};

	return (
		<div>
			<input
				placeholder="name"
				name="name"
				onChange={onChange}
				value={state.name}
			/>
			<input
				placeholder="description"
				name="description"
				onChange={onChange}
				value={state.description}
			/>
			<input
				placeholder="speaker name"
				name="speakerName"
				onChange={onChange}
				value={state.deadline}
			/>
			<input
				placeholder="speaker bio"
				onChange={onChange}
				value={state.attorName}
				name="speakerBio"
			/>
			<button onClick={createLitCase}>Create Talk</button>
			<div>
				{state.LitCases.map((LitCase, index) => (
					<div key={index}>
						<h2> index number is {index}</h2>
						<h3>{LitCase.description}</h3>
						<h5>{LitCase.name}</h5>
						<p>{LitCase.attorName}</p>
					</div>
				))}
			</div>
		</div>
	);
};


export default withAuthenticator(App);