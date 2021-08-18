export const makeMessage = (list) => {
  let eArray = [];
  for (let i = 0; i<list.length; i++){
    let index = i+1
    eArray.push(`\n(${index}) ${list[i].GalleryNumber} ||  ${list[i].title} | ${list[i].artistDisplayName}\n`);
  }
  const e = eArray.join("");

  return e;
}