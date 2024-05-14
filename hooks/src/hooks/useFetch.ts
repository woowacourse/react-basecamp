// 힌트 버전
import { useState, useEffect } from 'react';

const useFetch = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async (url: string) => {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setData(data);
			} catch (error) {
				setError(error as Error);
			}
			setIsLoading(false);
		};

		fetchData(url);
	}, [url]);

	return { data, isLoading, error };
};

export default useFetch;
