import Image from 'next/image';
import styles from './styles/Map.module.css'

const Map = (galleryNum) => {
  galleryNum = 9;
  let gallery = `gallery${galleryNum}`;

  return(
    <div>
      <Image src="/map1.svg" alt="1F" height={590} width={884} quality={100} layout={"responsive"}/>
      <img src={`/1F/Gallery${galleryNum}.png`} className={`${styles.overlay} ${gallery}`}/>
      
      {/* <img src='/1F/Gallery0-9.png' className={`${styles.overlay} ${gallery}`}/> */}

      {/* <Image src="/map2.svg" alt="2F" height={590} width={884} quality={100}/>

      <Image src="/map1m.svg" alt="1mF" height={590} width={884} quality={100}/> */}

      <style jsx>{`
      .gallery0{
        top: 51%;
        right: 0.15%;
        width: 43.4%;
      }

      .gallery1{
        top: 10.8%;
        right: 4%;
        width: 29.5%;
      }

      .gallery2{
        top: 53%;
        right: 17%;
        width: 17%;
      }

      .gallery3{
        top: 25.5%;
        right: 33%;
        width: 23%;
      }

      .gallery4{
        top: -0.75%;
        right: 39.95%;
        width: 20.7%;
      }

      .gallery5{
        top: 24%;
        left: 20.6%;
        width: 26.5%;
      }

      .gallery6{
        top: 11.75%;
        left: 3.25%;
        width: 18.45%;
      }

      .gallery7{
        top: 51%;
        left: 0.3%;
        width: 21%;
      }

      .gallery8{
        top: 71.5%;
        left: 0%;
        width: 40%;
      }

      .gallery9{
        top: 37%;
        left: 44.6%;
        width: 10.5%;
      }

          
        `}</style>
    </div>
  )

}

export default Map;