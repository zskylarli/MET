import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { getObjectById } from '../actions/getInfo.js';
import { getTrip } from '../actions/tripActions.js';
import ArtCard from '../components/artCard';
import styles from './styles/Home.module.css';
import { makeMessage } from '../actions/copy.js';
import LottieAnimation from '../actions/Lottie';
import home from '../public/loader.json';
import { sortLocation } from '../actions/sortLocation.js';
import Link from 'next/link';
import SavedNavbar from '../components/savedNavbar';

const ArtworkTab = () => {
	const router = useRouter();
	const [artworkList, setArtworkList] = useState([]);
	const [loading, setLoader] = useState(true);
	const [galleryNum, setHover] = useState('0');
	const [copied, setCopy] = useState(false);

  let key;
	const fetchDefault = async () => {
    if(router.query.key == 'undefined'){
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      key = urlParams.get('key');
    } else {
      key = router.query.key;
    }
		const res = await getTrip(key);
    console.log(res);
    const limit = res.artworks.length;

		const newArtworks = Array(limit);
		const promiseArray = Array(limit);

		if (res !== null){
			for (let i = 0; i < limit; i += 1) {
				promiseArray[i] = getObjectById(res.artworks[i].objectId);
			}

			Promise.all(promiseArray).then((values) => {
				values.forEach((artwork, i) => {
					let location = sortLocation(artwork.GalleryNumber);
					newArtworks[i] = {
						objectId: res.artworks[i].objectId,
						objectName: artwork.objectName || "",
						title: artwork.title || "",
						primaryImage: artwork.primaryImage || "",
						artistDisplayName: artwork.artistDisplayName || "Unknown",
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
	
				setArtworkList(newArtworks);
			})

		};
	}

	if(galleryNum >= 20){
		setHover(0);
	}
	let gallery = `gallery${galleryNum}`;

	const generateTripKey = async () => {
		console.log("bug");
	}

	const copyCodeToClipboard = () => {
		const message = makeMessage(artworkList);
    const el = document.createElement('textarea');
		el.value = message;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);

		//modified
		setCopy(false);
		setCopy(true);
  }

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
				handleHover = {setHover}
			/>
		</div>
	));

	const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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

			<SavedNavbar handleClick = {copyCodeToClipboard}/>

			<div>
			<img src="/metbg.png" alt="background" className="backgroundImg"/>
			<div className="mapContainer">
        <span>1F</span>
        <Image src="/map1.svg" priority={true} alt="1F" height={800} width={1199} quality={100} layout={"intrinsic"} />
        <span>2F</span>
        <Image src="/map2.svg" priority={true} alt="2F" height={800} width={1199} quality={100} layout={"intrinsic"}/>
        <img src={`/Gallery/Gallery${galleryNum}.png`} className={`${styles.overlay} ${gallery}`}/>
			</div>
			</div>
			
			{copied && (<div>
				<button type="button" className="btn btn-primary">
					<i className="bi bi-clipboard-check"></i> 
					Copied! 
				</button>
			</div>)}

			<div className="backgroundColor">
				{artworkTiles(artworkList)}
			</div>

			<i className="bi bi-arrow-bar-up" onClick={() => {returnTop();}}></i>


			<style jsx>{`
				span {
					textDecoration: none;
					cursor: pointer;
				}
				.backgroundColor {
					background-color: #2D3B42;
					width: 100%;
					height: 100%;
          padding-bottom: 2.5%;
				}

				.backgroundImg {
					position: fixed;
					height: 100vh;
					width: 48vw;
					object: cover;
					margin-left: 0;
					filter: brightness(60%) blur(2px);
					z-index: 1;
				}

				.container {
					position: relative;
				}

				.bi-arrow-bar-up {
					position: fixed;
					right: 3%;
					bottom: 1.5%; 
					font-size: 3rem;
					cursor: pointer;
          color: white;
				}

				.bi-arrow-bar-up:hover{
					color: #E4022B;
				}

				.btn-primary {
					z-index: 20;
					animation: slide-in-anim 1.5s ease-out forwards;
				}

				@keyframes slide-in-anim {
					0% {
						opacity: 0;
					}
					25% {
						transform: translateX(-2.5%);
					}
					50% {
						opacity: 1;
						transform: translateX(-5%);
					}
					75% {
						transform: translateX(-2.5%);
					}
					100% {
						opacity: 0;
						transform: translateX(-0%);
					}
				}				

				.suggestionBox {
					display: inline-flex;
    			align-items: center;
    			justify-content: center;
					flex-direction: column;
					background-color: #E4022B;
					width: 100%;
					height: 20vh;
					color: white;
				}

				.btn {
					position: fixed;
					right: 0;
					top: 1vh;
					font-size: 16px;
					padding: 1rem 1.5rem;
					cursor: pointer;
				}

				.gallery0-9{
					display: none;
				}
	
				.gallery0{
					top: var(--moveTop);
					right: var(--moveRight);
					width: var(--partWidth);
				}
	
				.gallery1{
					top: calc(var(--moveTop) - 15.25%);
					right: calc(var(--moveRight) + 3.75%);
					width: calc(var(--partWidth) - 14.5%);
				}
	
				.gallery2{
					top: calc(var(--moveTop) + 1%);
					right: calc(var(--moveRight) + 17%);
					width: calc(var(--partWidth) - 27%);
				}
	
				.gallery3{
					top: calc(var(--moveTop) - 9.75%);
					right: calc(var(--moveRight) + 33%);
					width: calc(var(--partWidth) - 21%);
				}
	
				.gallery4{
					top: calc(var(--moveTop) - 20%);
					right: calc(var(--moveRight) + 39.5%);
					width: calc(var(--partWidth) - 23%);
				}
	
				.gallery5{
					top: calc(var(--moveTop) - 10%);
					left: calc(var(--moveRight) + 20.5%);
					width: calc(var(--partWidth) - 17.75%);
				}
	
				.gallery6{
					top: calc(var(--moveTop) - 15%);
					left: calc(var(--moveRight) + 3%);
					width: calc(var(--partWidth) - 25.5%);
				}
	
				.gallery7{
					top: var(--moveTop);
					left: calc(var(--moveRight) - 0.5%);
					width: calc(var(--partWidth) - 22.75%);
				}
	
				.gallery8{
					top: calc(var(--moveTop) + 8%);
					left: calc(var(--moveRight) - 0.5%);
					width: calc(var(--partWidth) - 3%);
				}
	
				.gallery9{
					top: calc(var(--moveTop) - 5%);
					left: calc(var(--moveRight) + 44.5%);
					width: calc(var(--partWidth) - 33.5%); 
				}
	
				.gallery10{
					bottom: var(--moveBottom);
					right: var(--moveRight);
					width: calc(var(--partWidth) + 17%);
				}
	
				.gallery11{
					bottom: calc(var(--moveBottom) + 18.25%);
					right: calc(var(--moveRight) + 16.75%);
					width: calc(var(--partWidth) - 26.5%);
				}
	
				.gallery12{
					bottom: calc(var(--moveBottom) + 25.25%);
					right: calc(var(--moveRight) + 4.3%);
					width: calc(var(--partWidth) - 26.5%);
				}
	
				.gallery13{
					bottom: calc(var(--moveBottom) + 18.25%);
					right: calc(var(--moveRight) + 33%);
					width: calc(var(--partWidth) - 9.5%);
				}
	
				.gallery14{
					bottom: calc(var(--moveBottom) + 11.25%);
					left: calc(var(--moveRight) + 20%);
					width: calc(var(--partWidth) - 16.75%);
				}
	
				.gallery15{
					bottom: calc(var(--moveBottom) + 20%);
					left: calc(var(--moveRight) + 3%);
					width: calc(var(--partWidth) - 16.75%);
				}
	
				.gallery16{
					bottom: calc(var(--moveBottom) + 11%);
					left: calc(var(--moveRight) + 2%);
					width: calc(var(--partWidth) - 26%);
				}
	
				.gallery17{
					bottom: var(--moveBottom);
					left: var(--moveRight);
					width: calc(var(--partWidth) - 22.5%);
				}
	
				.gallery18{
					bottom: calc(var(--moveBottom) + 5.75%);
					left: calc(var(--moveRight) + 17%);
					width: calc(var(--partWidth) - 30%);
				}
	
				.gallery19{
					bottom: calc(var(--moveBottom) + 3%);
					left: calc(var(--moveRight) + 20%);
					width: calc(var(--partWidth) - 24%);
				}

				.mapContainer {
					margin-left: 7.75%;
					margin-top: 0.5%;
					--mapWidth: 36%;
					position: fixed;
					width: var(--mapWidth);
					--moveTop: 19.5%;
					--partWidth: 44%;
					--moveRight: 0.15%;
					--moveBottom: 3.65%;
					z-index: 5;
				}

        .mapContainer span {
					position: absolute;
					top: 52%;
					left: 2%;
					font-weight: 800;
					z-index: 10;
				}

				.mapContainer span:first-child {
					top: 2%;
				}
	
				/** desktop without bookmark bar */
				@media (min-height: 820px) {
					--moveTop: 19.5%;
					--mapWidth: 42.5%;
					--partWidth: 44%;
					--moveRight: 0.15%;
					--moveBottom: 3.65%;
				}
	
				/** monitor screen with bookmark bar*/
				@media (min-height: 900px) {
					--moveTop: 19.5%;
					--mapWidth: 37.5%;
					--partWidth: 44%;
					--moveRight: 0.15%;
					--moveBottom: 3.65%;
				}
	
				/** monitor screen without bookmar bar*/
				@media (min-height: 1000px) {
					--moveTop: 19.5%;
					--mapWidth: 35%;
					--partWidth: 44%;
					--moveRight: 0.15%;
					--moveBottom: 3.65%;
				}
          
        `}</style>

			<style jsx global>{`
			@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&display=swap');
			@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
			@import url(https://use.fontawesome.com/releases/v5.3.1/css/all.css);
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
