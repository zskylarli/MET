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

const ArtworkTab = () => {
	const router = useRouter();
	const [artworkList, setArtworkList] = useState([]);
	const [loading, setLoader] = useState(true);
	const [galleryNum, setHover] = useState('0-9');
	const [copied, setCopy] = useState(false);
	const [suggest, setSuggest] = useState(false);
	const [empty, setEmpty] = useState(false);

	const fetchDefault = async () => {
		const date = await getObjectByTimeRange(router.query.begin, router.query.end, router.query.keyword);
		const culture = await getObjectByArtistCulture(router.query.keyword);
		const medium = await getObjectByMedium(router.query.keyword, router.query.query);
		const geolocation = await getObjectByGeolocation(router.query.keyword, router.query.query);
		const resArray = [culture, medium, geolocation, date];
		console.log(resArray);
		
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
				numbers = range(0, limit);
			}
		}

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

	//remove when 2F map is added
	if(galleryNum >= 10){
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

			{!empty && <div>
			<Image src="/map1.svg" alt="1F" height={590} width={884} quality={100} layout={"responsive"}/>
			<img src={`/1F/Gallery${galleryNum}.png`} className={`${styles.overlay} ${gallery}`}/>
		
				<button type="button" className="btn btn-primary" onClick={() => copyCodeToClipboard()}>
				{!copied && <div><i className="bi bi-clipboard"></i>  Share This Itinerary</div>}
				{copied && <div><i className="bi bi-clipboard-check"></i>  Copied! </div>}
				</button>
			</div>}

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
				{artworkTiles(artworkList)}
			</div>}

			<style jsx>{`
				span {
					textDecoration: none;
					cursor: pointer;
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
					top: 6.25%;
					left: -0.2%;
					width: 100%;
					transform: translate(0, var(--moveTop));
				}

				.gallery0{
					top: 51%;
					right: 0.15%;
					width: 43.4%;
					transform: translate(0, var(--moveTop));
				}
	
				.gallery1{
					top: 10.8%;
					right: 4%;
					width: 29.5%;
					transform: translate(0, calc(var(--moveTop) + 4%));
				}
	
				.gallery2{
					top: 53%;
					right: 17%;
					width: 17%;
					transform: translate(0, calc(var(--moveTop) - 11.5%));
				}
	
				.gallery3{
					top: 25.5%;
					right: 33%;
					width: 23%;
					transform: translate(0, calc(var(--moveTop) + 1.5%));
				}
	
				.gallery4{
					top: -0.75%;
					right: 39.95%;
					width: 20.7%;
					transform: translate(0, calc(var(--moveTop) + 6.5%));
				}
	
				.gallery5{
					top: 24%;
					left: 20.6%;
					width: 26.5%;
					transform: translate(0, calc(var(--moveTop) + 4.2%));
				}
	
				.gallery6{
					top: 11.75%;
					left: 3.25%;
					width: 18.45%;
					transform: translate(0, calc(var(--moveTop) + 4.2%));
				}
	
				.gallery7{
					top: 51%;
					left: 0.3%;
					width: 21%;
					transform: translate(0, calc(var(--moveTop) - 4.2%));
				}
	
				.gallery8{
					top: 71.5%;
					left: 0%;
					width: 40%;
					transform: translate(0, calc(var(--moveTop) - 7.5%));
				}
	
				.gallery9{
					top: 37%;
					left: 44.6%;
					width: 10.5%;
					transform: translate(0, var(--moveTop));
				}
	
				@media (max-width: 2600px) {
					--moveTop: -6%;
				}
	
				@media (min-width: 3000px) {
					--moveTop: 15%;
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
