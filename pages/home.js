import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { getObjectById, getObjectByArtistCulture, getObjectByGeolocation, getObjectByMedium, getObjectByTimeRange } from '../actions/getInfo.js';
import ArtCard from '../components/artCard';
import styles from './styles/Home.module.css';
import Link from 'next/link';
import LottieAnimation from '../actions/Lottie';
import home from '../public/loader.json';
import { sortLocation } from '../actions/sortLocation.js'

const ArtworkTab = () => {
	const router = useRouter();
	const [artworkList, setArtworkList] = useState([]);
	const [loading, setLoader] = useState(true);

	const artworkTiles = (list) => list.map((artwork) => (
		<div key={artwork.objectId} className={styles.tile}>
			<ArtCard 
				primaryImage = {artwork.primaryImage}
				artistDisplayName = {artwork.artistDisplayName}
				artistDisplayBio = {artwork.artistDisplayBio}
				artistWikidata_URL = {artwork.artistWikidata_URL}
				title = {artwork.title}
				culture = {artwork.culture}
				period = {artwork.period}
				medium = {artwork.medium}
				dimensions = {artwork.dimensions}
				creditLine = {artwork.creditLine}
				department = {artwork.department}
				GalleryNumber = {artwork.GalleryNumber}
				isHighlight = {artwork.isHighlight}
				objectURL = {artwork.objectURL}
				location = {artwork.location}
			/>
		</div>
	));

	const fetchDefault = async () => {
		let res4 = await getObjectByTimeRange(router.query.begin, router.query.end, router.query.keyword);
		let res1 = await getObjectByArtistCulture(router.query.keyword);
		let res2 = await getObjectByMedium(router.query.keyword, router.query.query);
		let res3 = await getObjectByGeolocation(router.query.keyword, router.query.query);
		
		let res;
		if (router.query.theme === "artistculture") {
			res = res1;
		} else if (router.query.theme === "medium") {
			res = res2;
		} else if (router.query.theme === "geolocation") {
			res = res3;
		} else if (router.query.theme === "period") {
			console.log(router.query.begin);
			res = res4;
		}

		console.log(res);

		let limit,n,p;
		let numbers = [];
		if(res.total > 20){
			limit = 20;
			for (let i = 0; i < 20; i++) {
				do {
					n = Math.floor(Math.random() * (res.total+ 1));
					p = numbers.includes(n);
					if(!p){
						numbers.push(n);
					}
				}
				while(p);
			}	
		}else{
			limit = res.total;
			numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
		}
		console.log(numbers);

		const newArtworks = Array(limit);
		const promiseArray = Array(limit);

		for (let i = 0; i < limit; i += 1) {
			promiseArray[i] = getObjectById(res.objectIDs[numbers[i]]);
		}
	
		Promise.all(promiseArray).then((values) => {
			values.forEach((artwork, i) => {
				let location = sortLocation(artwork.GalleryNumber);
				newArtworks[i] = {
					objectId: res.objectIDs[i],
					objectName: artwork.objectName || "",
					title: artwork.title || "",
					primaryImage: artwork.primaryImage || "",
					artistDisplayName: artwork.artistDisplayName || "",
					artistDisplayBio: artwork.artistDisplayBio || "",
					artistWikidata_URL: artwork.artistWikidata_URL || "",
					dimensions: artwork.dimensions || "",
					culture: artwork.culture || "",
					period: artwork.period || "",
					medium: artwork.medium || "",
					creditLine: artwork.creditLine || "",
					department: artwork.department || "",
					GalleryNumber: artwork.GalleryNumber || "",
					objectURL: artwork.objectURL || "",
					objectWikidata_URL: artwork.objectWikidata_URL || "",
					isHighlight: artwork.isHighlight || "",
					location: location || "20",
				};
			});

			newArtworks.sort(function(a, b) {
				var keyA = a.location,
					keyB = b.location;
				if (keyA < keyB) return -1;
				if (keyA > keyB) return 1;
				return 0;
			});

			setArtworkList(newArtworks);
		})
	};

	useEffect(() => {
    fetchDefault();
		setTimeout(() => {
			setLoader(false);
		}, 5000);
  }, []);

	return(
		<div>
			{loading && (
				<div className={styles.loaderBox}> 
					<LottieAnimation lotti={home} height={500} width={500} />
		 		</div>
			)}
				
			<Link href="/">Return</Link>
			{artworkTiles(artworkList)}

			<style jsx global>{`
			@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&display=swap');
			@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
			html,
			body {
				padding: 0;
				margin: 0;
				font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
					Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
					sans-serif;
				font-family: 'Bitter', serif;
			}

			* {
				box-sizing: border-box;
			}
		`}</style>
		</div>
	)
}

export default ArtworkTab;
