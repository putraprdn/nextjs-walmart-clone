import { Result } from "@/typings/searchTypings";

async function fetchSearch(searchTerm: string) {
	const username = process.env.OXYLABS_USERNAME;
	const password = process.env.OXYLABS_PASSWORD;

	const newUrl = new URL(`https://www.walmart.com/search?q=${searchTerm}`);

	const body = {
		source: "universal_ecommerce",
		url: newUrl.toString(),
		geo_locations: "United States",
		parse: true,
	};

	const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${Buffer.from(
				`${username}:${password}`
			).toString("base64")}`,
		},
		next: {
			revalidate: 60 * 60,
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.results?.length == 0) return;

			const result: Result = data.results[0];

			return result;
		})
		.catch((error) => {
			console.log("there was an error");
			console.log(error);
		});

	return response;
}

export default fetchSearch;
