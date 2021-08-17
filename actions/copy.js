export const makeMessage = (list) => {
  const e = `
  Itinerary
  1) ${list[0].GalleryNumber} ||  ${list[0].title} | ${list[0].artistDisplayName} 
  2) ${list[1].GalleryNumber} ||  ${list[1].title} | ${list[1].artistDisplayName} 
  3) ${list[2].GalleryNumber} ||  ${list[2].title} | ${list[2].artistDisplayName} 
  4) ${list[3].GalleryNumber} ||  ${list[3].title} | ${list[3].artistDisplayName} 
  5) ${list[4].GalleryNumber} ||  ${list[4].title} | ${list[4].artistDisplayName} 
  6) ${list[5].GalleryNumber} ||  ${list[5].title} | ${list[5].artistDisplayName} 
  7) ${list[6].GalleryNumber} ||  ${list[6].title} | ${list[6].artistDisplayName} 
  8) ${list[7].GalleryNumber} ||  ${list[7].title} | ${list[7].artistDisplayName} 
  9) ${list[8].GalleryNumber} ||  ${list[8].title} | ${list[8].artistDisplayName} 
  10) ${list[9].GalleryNumber} ||  ${list[9].title} | ${list[9].artistDisplayName} 
  11) ${list[10].GalleryNumber} ||  ${list[10].title} | ${list[10].artistDisplayName} 
  12) ${list[11].GalleryNumber} ||  ${list[11].title} | ${list[11].artistDisplayName} 
  13) ${list[12].GalleryNumber} ||  ${list[12].title} | ${list[12].artistDisplayName} 
  14) ${list[13].GalleryNumber} ||  ${list[13].title} | ${list[13].artistDisplayName} 
  15) ${list[14].GalleryNumber} ||  ${list[14].title} | ${list[14].artistDisplayName} 
  16) ${list[15].GalleryNumber} ||  ${list[15].title} | ${list[15].artistDisplayName} 
  17) ${list[16].GalleryNumber} ||  ${list[16].title} | ${list[16].artistDisplayName} 
  18) ${list[17].GalleryNumber} ||  ${list[17].title} | ${list[17].artistDisplayName} 
  19) ${list[18].GalleryNumber} ||  ${list[18].title} | ${list[18].artistDisplayName} 
  20) ${list[19].GalleryNumber} ||  ${list[19].title} | ${list[19].artistDisplayName} 
  `
  return e;
}