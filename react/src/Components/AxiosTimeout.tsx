import React, { useEffect, useState } from 'react';
import axios from 'axios'

interface IFullName {
	first: string;
	last: string;
}

export default function AxiosTimeout() {
	const [name, setName] = useState<IFullName>({ first: '', last: '' });
	const baseUrl = process.env.REACT_APP_NODE_IP || 'localhost:3008';
	useEffect(() => {
		let baseURL = 'http://' + baseUrl
		axios.post(
			baseURL + '/echo',
			{
				firstParam: 'foo',
				secondParam: 'bar'
			},
			{
				timeout: 5000,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		).then(
			response => setName({ first: response.data.first, last: response.data.last }),
			error => console.log(error));
	}, []);

	return (
		<div>
			Axios POST <br />
			{name.first} {name.last}
			<br />
			<small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
		</div>
	)

}

