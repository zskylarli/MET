/**
 * input is JSON of object Ids
 * @returns response with key
 */
 export const saveTrip = async (trip) => {
   console.log(trip);
	const res = await fetch('http://localhost:7000/save',
		{
			method: 'POST',
      body: JSON.stringify(trip),
      headers: { "Content-Type": "application/json" },
      mode: 'cors',
		}
	);
	if (!res.ok) {
		return {}
	}
	return res.json();
}

/**
 * input key Id
 * @returns a listing of all valid Object IDs available
 */
 export const getTrip = async (key) => {
 const res = await fetch('http://localhost:7000/key/' + key,
   {
     method: 'GET',
     headers: { "Content-Type": "application/json" },
     mode: 'cors',
   }
 );
 if (!res.ok) {
   return {}
 }
 return res.json();
}