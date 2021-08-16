import styles from '../pages/styles/Card.module.css';
import React, { useState } from 'react';
import Link from 'next/link';

const ArtCard = ({
	primaryImage = '',
	artistDisplayName = 'Unknown',
	artistDisplayBio = '',
	artistWikidata_URL = '',
	title = '',
	culture = '',
	period = '',
	medium = '',
	dimensions = '',
	creditLine = '',
	department = '',
	GalleryNumber = '',
	isHighlight,
}) => {
	const [artistInfo, setArtistInfo] = useState(true);

	if(artistDisplayName===''){
		artistDisplayName === [culture, 'artist'].join();
		setArtistInfo(false);
	} 

	return (
		<div className={styles.container}>
			<div className={styles.frame}> 
				<div className={styles.mat}>
					<div className={styles.art}>
						<img src={primaryImage} />
					</div>
				</div>
			</div>
			<div className={styles.card}>
				{isHighlight && <i class="bi bi-bookmark-star"></i>}
				<Link href={artistWikidata_URL}>
					<h2>{artistDisplayName}</h2>
				</Link>
				{artistInfo && <h3>{artistDisplayBio}</h3>}

				<h1><b>{title}</b>, {period}</h1>
				<h3>{medium}, {dimensions}</h3>

				<p>{creditLine}</p>
			</div>
		</div>
	);
}

export default ArtCard;