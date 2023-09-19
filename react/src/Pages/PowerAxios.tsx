import React, { useEffect, useState } from "react";
import axios from 'axios';

const PowerAxios = () => {
	const [data, setData] = useState("iniiiii");

	useEffect(() => {
		let mounted = true;
        
		const loadData = async () => {
			if (mounted) {
				try {
					let result = await axios.get("https://jsonplaceholder.typicode.com/users?_limit=1")
                    setData(result.data[0].name)
				} catch (error) {
					console.error(error)
				}
			}
		}

		loadData();

		return () => {
			mounted = false
		}
	}, []);

	return (
		<div className="card">
			{JSON.stringify(data)}
		</div>
	);
};

export default PowerAxios;