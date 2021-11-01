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

	return (
		<div className={styles.container}>
			<div className={styles.frame}> 
				<div className={styles.mat}>
					<div className={loadStyle}>
							<img src={primaryImage} style={loaded ? {} :{display:'none'}} onLoad={() => {setLoaded(true); setStyle(styles.art);}}/>
					</div>
				</div>
			</div>
			<div className={styles.card} onClick={() => {handleHover(location);}}>
				{isHighlight && <i class="bi bi-bookmark-star"></i>}
				
				<h2>{artistDisplayName}</h2>
				<h3>{artistDisplayBio}</h3>
				<h1><b>{title}</b> {period}</h1>
				<h3>{medium}, {dimensions}</h3>
				<p>{creditLine}</p>

				<a target="_blank" href={objectURL} style={{ textDecoration: 'none' }}><i className="bi bi-bank"></i></a>
				<a target="_blank" href={artistWikidata_URL} style={{ textDecoration: 'none' }}><i className="bi bi-search"></i></a>
			</div>
		
			<style jsx>{`
			.bi-bank:hover{
				color: #E4022B;
				cursor:pointer;
			}

			.bi-search {
				margin-left: 0.75rem;
				margin-right: 2rem;
				top: 0.1rem;
			}

			.bi-search:hover{
				color: #C9963B;
				cursor:pointer;
			}

    	`}</style>
		</div>
	);
}

export default ArtCard;