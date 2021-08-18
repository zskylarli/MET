import Image from 'next/image';
import styles from './styles/Map.module.css'
import Navbar from '../components/navbar'

const Map = (galleryNum) => {
  galleryNum = 12;
  let gallery = `gallery${galleryNum}`;

  return(
    <div>
      <Navbar />
      <img src="/metbg.png" alt="background" className="backgroundImg"/>
      <div className="mapContainer">
        <Image src="/map1.svg" alt="1F" height={800} width={1199} quality={100} layout={"intrinsic"}/>
        <Image src="/map2.svg" alt="2F" height={800} width={1199} quality={100} layout={"intrinsic"}/>
        <img src={`/Gallery/Gallery${galleryNum}.png`} className={`${styles.overlay} ${gallery}`}/>
      </div>

      <style jsx>{`
      .mapContainer {
        position: fixed;
        width: var(--mapWidth);
        margin-left: 5rem;
      }

      .backgroundImg {
        position: fixed;
        height: 100vh;
        width: 50vw;
        object: cover;
        margin-left: 0;
        filter: blur(5px);
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

      /** desktop with bookmark bar */
      @media (min-height: 200px) {
        --moveTop: 19.5%;
        --mapWidth: 41%;
        --partWidth: 44%;
        --moveRight: 0.15%;
        --moveBottom: 3.65%;
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

		`}</style>

    </div>
  )

}

export default Map;