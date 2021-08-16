/**
 * no input
 * @returns a listing of all valid Object IDs available
 */
export const getAllObjects = async () => {
	const res = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects',
		{
			method: 'GET',
		}
	);
	if (!res.ok) {
		return {};
	}
	return res.json();
}

/**
 * requires valid object Id
 * @returns all info about object
 */
 export const getObjectById = async (objectId) => {
	const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`,
		{
			method: 'GET',
		}
	);
	if (!res.ok) {
		return {};
	}
	return res.json();
}

/**
 * no input
 * @returns a listing of all departments
 */
 export const getDepartments= async () => {
	const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/departments`,
		{
			method: 'GET',
		}
	);
	if (!res.ok) {
		return {};
	}
	return res.json();
}

/**
 * requires Artist or Culture
 * @returns a listing of all object IDs filtered by keyword
 */
 export const getObjectByArtistCulture= async (keyword) => {
	const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&artistOrCulture=true&q=${keyword}`,
		{
			method: 'GET',
		}
	);
	if (!res.ok) {
		return {};
	}
	console.log(res);
	return res.json();
}

/**
 * requires geolocation
 * @returns a listing of all object IDs filtered by keyword
 */
 export const getObjectByGeolocation= async (keyword, query) => {
	const keyword2 = keyword.charAt(0).toUpperCase() + keyword.slice(1);

	const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&geoLocation=${keyword2}&q=${query}`,
		{
			method: 'GET',
		}
	);
	if (!res.ok) {
		return {};
	}
	console.log(res);
	return res.json();
}

/**
 * requires appropriate medium
 * @returns a listing of all object IDs filtered by keyword
 */
 export const getObjectByMedium= async (keyword, query) => {
	const keyword2 = keyword.charAt(0).toUpperCase() + keyword.slice(1);

	const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&medium=${keyword2}&q=${query}`,
		{
			method: 'GET',
		}
	);
	if (!res.ok) {
		return {};
	}
	console.log(res);
	return res.json();
}

/**
 * requires time range (two dates)
 * @returns a listing of all object IDs filtered by keyword
 */
 export const getObjectByTimeRange = async (keyword, query) => {
	let result = keyword.split("-"); 
	let begin= result[0];
	let end= result[1];
	const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&dateBegin=${begin}}&dateEnd=${end}&q=${query}`,
		{
			method: 'GET',
			mode: 'no-cors',
		}
	);
	if (!res.ok) {
		return {};
	}
	console.log(res);
	return res.json();
}




