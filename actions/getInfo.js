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
	return res.json();
}

/**
 * requires Artist or Culture
 * @returns a listing of all object IDs filtered by keyword
 */
 export const getObjectTest = async () => {
	const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&artistOrCulture=true&q=gogh`,
		{
			method: 'GET',
		}
	);
	if (!res.ok) {
	}
	console.log(res);
	return res.json();
}



