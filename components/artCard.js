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
	location = '',
	GalleryNumber = '',
	objectURL = '',
	isHighlight,
	handleHover = () => {},
}) => {
	const [loadStyle, setStyle] = useState(styles.loadingImg); 
	const [loaded, setLoaded] = useState(false);

	const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

	return (
		<div className={styles.container}>
			<div className={styles.frame}> 
				<div className={styles.mat}>
					<div className={loadStyle}>
							<img src={primaryImage} style={loaded ? {} :{display:'none'}} onLoad={() => {setLoaded(true); setStyle(styles.art);}}/>
					</div>
				</div>
			</div>
			<div className={styles.card} onClick={() => {returnTop(); handleHover(location);}}>
				{isHighlight && <i class="bi bi-bookmark-star"></i>}
				<Link href={artistWikidata_URL}>
					<h2>{artistDisplayName}</h2>
				</Link>
				<h3>{artistDisplayBio}</h3>

				<Link href={objectURL} style={{ textDecoration: 'none' }}>
					<h1><b>{title}</b> {period}</h1>
				</Link>
					<h3>{medium}, {dimensions}</h3>
				<p>{creditLine}</p>
			</div>
		</div>
	);
}

export default ArtCard;