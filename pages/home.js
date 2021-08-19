import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { getObjectById, getObjectByArtistCulture, getObjectByGeolocation, getObjectByMedium, getObjectByTimeRange } from '../actions/getInfo.js';
import ArtCard from '../components/artCard';
import styles from './styles/Home.module.css';
import { makeMessage } from '../actions/copy.js';
import LottieAnimation from '../actions/Lottie';
import home from '../public/loader.json';
import notfound from '../public/notfound.json';
import { sortLocation } from '../actions/sortLocation.js';
import Link from 'next/link';
import Footsteps from '../components/footsteps';
import Navbar from '../components/navbar';

const ArtworkTab = () => {
	const router = useRouter();
	const [artworkList, setArtworkList] = useState([]);
	const [loading, setLoader] = useState(true);
	const [galleryNum, setHover] = useState('0');
	const [copied, setCopy] = useState(false);
	const [suggest, setSuggest] = useState(false);
	const [empty, setEmpty] = useState(false);
	const [numberWorks, setNumber] = useState(0);

	const fetchDefault = async () => {
		const date = await getObjectByTimeRange(router.query.begin, router.query.end, router.query.keyword);
		const culture = await getObjectByArtistCulture(router.query.keyword);
		const medium = await getObjectByMedium(router.query.keyword, router.query.query);
		const geolocation = await getObjectByGeolocation(router.query.keyword, router.query.query);
		const resArray = [culture, medium, geolocation, date];
		
		let res;
		const max = Math.max(culture.total, medium.total, geolocation.total, date.total);

		if (router.query.theme === "artistculture" && culture.total !== 0) {
			res = culture;
		} else if (router.query.theme === "medium" && medium.total !== 0) {
			res = medium;
		} else if (router.query.theme === "geolocation" && geolocation.total !== 0) {
			res = geolocation;
		} else if (router.query.theme === "period" && date.total !== 0) {
			res = date;
		} else if (max === 0) {
			setEmpty(true);	
			res = null;
		}	else {
			const maxRes = resArray.find( (res) => res.total === max );
			res = maxRes;
			setSuggest(true);
		}

		//generate random numbers to index artworks for large res
		let limit,n,p;
		let numbers = [];
		let maxView = Math.floor(router.query.time * 12);

		if(res !== null ){
			if(res.total > maxView){
				limit = maxView;
				for (let i = 0; i < maxView; i++) {
					do {
						n = Math.floor(Math.random() * (res.total+ 1));
						p = numbers.includes(n);
						if(!p){
							numbers.push(n);
						}
					}
					while(p);
				}	
			} else{
				limit = res.total;
				numbers=[];let j=0; while(numbers.push(j++) <limit);
			}
		}

		setNumber(limit);

		const newArtworks = Array(limit);
		const promiseArray = Array(limit);

		if (res !== null){
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
	}

	if(galleryNum >= 20){
		setHover(0);
	}
	let gallery = `gallery${galleryNum}`;

	const copyCodeToClipboard = () => {
		const message = makeMessage(artworkList);
    const el = document.createElement('textarea');
		el.value = message;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
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

	// var N = Math.ceil(numberWorks/6); 
  // const items = Array.apply(null, {length: N}).map(Number.call, Number);

	// let itemList=[];
	// items.forEach((item)=>{
  // 	itemList.push( <div className="container"><Footsteps key={item}/></div>)
	// })

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

			<Navbar handleClick = {copyCodeToClipboard}/>

			{!empty && (<div>
			<img src="/metbg.png" alt="background" className="backgroundImg"/>
			<div className="mapContainer">
        <Image src="/map1.svg" alt="1F" height={800} width={1199} quality={100} layout={"intrinsic"} />
        <Image src="/map2.svg" alt="2F" height={800} width={1199} quality={100} layout={"intrinsic"}/>
        <img src={`/Gallery/Gallery${galleryNum}.png`} className={`${styles.overlay} ${gallery}`}/>
			</div>
			</div>
			)}
			
			{copied && (<div>
				<button type="button" className="btn btn-primary">
					<i className="bi bi-clipboard-check"></i> 
					Copied! 
				</button>
			</div>)}

			{suggest && <div className="suggestionBox">
				<h3>Did you mean to search by a different criteria?</h3>
				<br></br>
				<p>Showing alternative results...</p>
			</div>}

			{empty && <div className={styles.notFoundBox}>
					<LottieAnimation lotti={notfound} height={500} width={500} />
				<h3>Maybe for a trip to another museum...plan <Link href='/'><span>a new trip?</span></Link></h3>
			</div>}

			{!empty && <div>
				<Footsteps/>

				{artworkTiles(artworkList)}
				{/* {itemList} */}
			</div>}

			<i className="bi bi-arrow-bar-up" onClick={() => {returnTop();}}></i>


			<style jsx>{`
				span {
					textDecoration: none;
					cursor: pointer;
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
					top: calc(var(--moveTop) - 23%);
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
					margin-left: 6.5%;
					margin-top: 1%;
					--mapWidth: 39%;
					position: fixed;
					width: var(--mapWidth);
					--moveTop: 19.5%;
					--partWidth: 44%;
					--moveRight: 0.15%;
					--moveBottom: 3.65%;
					z-index: 5;
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
					--mapWidth: 39%;
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
