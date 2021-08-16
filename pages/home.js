import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getObjectById, getObjectTest } from '../actions/getInfo.js';
import ArtCard from '../components/artCard';
import styles from './styles/Home.module.css';

export default function ArtworkTab() {
	const [artworkList, setArtworkList] = useState([]);

	const artworkTiles = (list) => list.map((artwork) => (
		<div key={artwork.objectId} className={styles.tile}>
		<Link href={artwork.objectURL} style={{ textDecoration: 'none' }}>
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
			/>
		</Link>
		</div>
	));

	const fetchDefault = async () => {
		const res = await getObjectTest();
		const newArtworks = Array(res.total);
		const promiseArray = Array(res.total);

		for (let i = 0; i < res.total; i += 1) {
			promiseArray[i] = getObjectById(res.objectIDs[i]);
    }

		Promise.all(promiseArray).then((values) => {
			values.forEach((artwork, i) => {
				newArtworks[i] = {
					objectId: res.objectIDs[i],
					objectName: artwork.objectName || "",
					title: artwork.title || "",
					primaryImage: artwork.primaryImage,
					artistDisplayName: artwork.artistDisplayName || "",
					artistDisplayBio: artwork.artistDisplayBio || "",
					artistWikidata_URL: artwork.artistWikidata_URL || "",
					dimensions: artwork.dimensions || "",
					culture: artwork.culture || "",
					period: artwork.period || "",
					medium: artwork.medium || "",
					creditLine: artwork.creditLine || "",
					department: artwork.department,
					GalleryNumber: artwork.GalleryNumber,
					objectURL: artwork.objectURL,
					objectWikidata_URL: artwork.objectWikidata_URL || "",
					isHighlight: artwork.isHighlight,
				};
			});
			setArtworkList(newArtworks);
		})
	};

	useEffect(() => {
    fetchDefault();
  }, []);

	return(
		<div>
			{artworkTiles(artworkList)}

			<style jsx global>{`
			@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&display=swap');
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
