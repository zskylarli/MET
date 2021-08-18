/**
 * requires time range (two dates)
 * @returns a listing of all object IDs filtered by keyword
 */
 export const sortLocation = (x) => {
   if (x >= 100 && x < 150){
     return 0;
   } else if (x === 173 || x === 174 || x === 176){
    return 18;
  } else if (x >= 150 && x <= 200){
    return 8;
  } else if (x >= 200 && x <= 240){
    return 10;
  } else if (x >= 300 && x <= 310){
    return 9;
  } else if (x >= 350 && x <= 360){
    return 7;
  } else if (x >= 370 && x <= 399){
    return 2;
  } else if (x >= 400 && x <= 407){
    return 19;
  } else if (x >= 410 && x <= 470){
    return 17;
  } else if (x >= 500 && x <= 521){
    return 3;
  } else if (x >= 522 && x <= 560){
    return 5;
  } else if (x === 535 || x >= 690 && x<=693 || x >= 850 && x<=853){
    return 14;
  } else if (x >= 600 && x <= 650){
    return 13;
  } else if (x >= 704 && x<= 706 || x >= 717 && x<= 720 ){
    return 12;
  } else if (x === 707 || x === 773 || x === 774 || x >= 700 && x <= 746){
    return 1;
  } else if (x >= 747 && x <= 780){
    return 12;
  } else if (x >= 800 && x <= 830){
    return 16;
  } else if (x >= 900 && x <= 913){
    return 6;
  } else if (x >= 917 && x <= 925 || x === 899 || x === 999 ){
    return 15;
  } else if (x >= 950 && x <= 970 || x === 915 ){
    return 4;
  } else {
    return 20
  }
 }