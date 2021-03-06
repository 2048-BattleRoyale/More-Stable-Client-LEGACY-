var gridContainer=document.getElementById('gridlines');
gridContainer.style.transform="translate(0vmin,0vmin)";
//document.getElementById('background').style.transform="translate(1vmin,0vmin)"
//Draw those snazzy vertical lines
for (index = 1; index < 14; index++) {
  var vertical_line = document.createElement('div');
  vertical_line.className='vline';
  vertical_line.id="vline"+index.toString();
  gridContainer.appendChild(vertical_line);  
  document.getElementById("vline"+index.toString()).style.transform = "translate("+( 5.75*index).toString()+"vmin,"+(0).toString()+"vmin)";
}
//Draw some snazzier horizontal lines
for (index = 1; index < 14; index++) {
  var horizontal_line = document.createElement('div');
  horizontal_line.className='hline';
  horizontal_line.id="hline"+index.toString();
  gridContainer.appendChild(horizontal_line);  
  document.getElementById("hline"+index.toString()).style.transform = "translate("+(0).toString()+"vmin,"+(5.75*index).toString()+"vmin)";
}
//Variable&Class Declarations
var  grid= document.getElementById('tiles');
var userToken = "PLACEHOLDER";
var score = 0;
var totalB=0;
var animationDuration=500;
var lastStrokeTime;
var packetSent = false;
var playerAlive = true;
var players=[];
var eventuallyRemove=[];
var board = {"players":{1:{"Name":"String","Score":0},2:{"Name":"String","Score":0},3:{"Name":"String","Score":4},4:{"Name":"String","Score":0}},"boxes":{"1":{"enabled":true,"tileNum":2,"tileId":1,"owner":1,"justMerged":false},"2":{"enabled":true,"tileNum":512,"tileId":85,"owner":2,"justMerged":false},"3":{"enabled":true,"tileNum":4096,"tileId":96,"owner":1,"justMerged":false},"4":{"enabled":true,"tileNum":128,"tileId":37,"owner":1,"justMerged":false},"5":{"enabled":true,"tileNum":32,"tileId":193,"owner":1,"justMerged":false},"6":{"enabled":true,"tileNum":2,"tileId":112,"owner":1,"justMerged":false},"7":{"enabled":true,"tileNum":256,"tileId":196,"owner":1,"justMerged":false}}};
var boardTest = {"players":{1:{"Name":"String","Score":0},2:{"Name":"String","Score":0},3:{"Name":"String","Score":4},4:{"Name":"String","Score":0}},"boxes":{"1":{"enabled":true,"tileNum":2,"tileId":2,"owner":1,"justMerged":false},"4":{"enabled":true,"tileNum":128,"tileId":21,"owner":1,"justMerged":false},"5":{"enabled":true,"tileNum":32,"tileId":12,"owner":1,"justMerged":false},"6":{"enabled":true,"tileNum":2,"tileId":98,"owner":1,"justMerged":false},"7":{"enabled":true,"tileNum":256,"tileId":34,"owner":1,"justMerged":false},"8":{"enabled":true,"tileNum":4096,"tileId":88,"owner":1,"justMerged":false},"9":{"enabled":true,"tileNum":2,"tileId":127,"owner":1,"justMerged":false},"10":{"enabled":true,"tileNum":16,"tileId":63,"owner":1,"justMerged":false}}};
var boardTestTest={"players":{1:{"Name":"String","Score":0},2:{"Name":"String","Score":0},3:{"Name":"String","Score":4},4:{"Name":"String","Score":0}},"boxes":{"1":{"enabled":true,"tileNum":2,"tileId":2,"owner":1,"justMerged":false},"4":{"enabled":true,"tileNum":128,"tileId":21,"owner":1,"justMerged":false},"5":{"enabled":true,"tileNum":32,"tileId":12,"owner":1,"justMerged":false},"6":{"enabled":true,"tileNum":2,"tileId":98,"owner":1,"justMerged":false},"9":{"enabled":true,"tileNum":2,"tileId":51,"owner":1,"justMerged":false},"11":{"enabled":true,"tileNum":4,"tileId":25,"owner":1,"justMerged":false}}};
badJSON={"players":[{"name":"Billy Bob","score":0},{"name":"Jane Bob","score":4},{"name":"Joe Smith","score":2220},{"name":"Jack Sprat","score":0}],"boxes":[{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":8,"tileId":2,"owner":1},{"enabled":true,"tileNum":2,"tileId":3,"owner":1},{"enabled":true,"tileNum":64,"tileId":1,"owner":3},{"enabled":true,"tileNum":2,"tileId":4,"owner":1},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":2,"tileId":6,"owner":1},{"enabled":true,"tileNum":2,"tileId":7,"owner":1},{"enabled":true,"tileNum":2,"tileId":5,"owner":2},{"enabled":true,"tileNum":2,"tileId":8,"owner":1},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},
{"enabled":true,"tileNum":128,"tileId":19,"owner":3},{"enabled":true,"tileNum":16384,"tileId":17,"owner":2},{"enabled":true,"tileNum":2048,"tileId":18,"owner":4},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":8,"tileId":10,"owner":1},{"enabled":true,"tileNum":2,"tileId":11,"owner":1},{"enabled":true,"tileNum":2,"tileId":9,"owner":3},{"enabled":true,"tileNum":4,"tileId":12,"owner":2},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":2,"tileId":14,"owner":1},{"enabled":true,"tileNum":2,"tileId":15,"owner":1},{"enabled":true,"tileNum":2,"tileId":13,"owner":4},{"enabled":true,"tileNum":2,"tileId":16,"owner":1},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":true,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0},{"enabled":false,"tileNum":0,"tileId":0,"owner":0}]};
var newBoard;
var gamestarted=false;
var sessionID;
var myPlayerNum=4;
var lockedBoxes=[];
var lightColor='F9F6F2';
var darkColor='776E65';
var transformnumx=5.741924954411;
var oldnew;
var oldBoard={"players":{},"boxes":{}};
var transformnumy=5.747124954411;
var debug=false;
var recentboard={"players":{},"boxes":{}};
var okayWork=true;
//Test/Example board used for testing out a real board object.
//Color Profiles Stored Dynamically Online- this is the default
var theme1={ //This is the standard 2048 theme
    "2":"EEE4DA",
    "4":"ede0c8",
    "8":"F2B179",
    "16":"F59563",
    "32":"F67C5F",
    "64":"F65E3B",
    "128":"EDCF72",
    "256":"EDCC61",
    "512":"EDC850",
    "1024":"EDC53F",
    "2048":"EDC22E",
    "4096":"F4DA81",
    "8192":"FBF2D5",
    "16384":"9000FF"
}
var extraInfo={
  "gridBackground":"CDC1B4",
  "lineBorder":"BBADA0",
  "blocked":"978F86",
  "darkColor":"776e65",
  "lightColor":"F9F6F2"
}

//Tile class is the object that's stored in each array.
//console.log(board.boxes["3"].tileId);
class Tile {
  constructor(id,x,y,value,owner,enabled) {
    this.x=x;
    this.y=y;
    this.value=value;
    this.id=id;
    this.owner=owner;
    this.enabled=enabled;
  }

}

//Practical side-functions
function findCurrentAnim(id,xory) { // Useful in the console to find X or Y
  var transforms=document.getElementById('tile'+id.toString()).style.transform;
  transformY=((transforms.split('translateY'))[1].slice(0,(transforms.split('translateY'))[1].length-5));
  transformY=transformY.slice(1,transformY.length-5)
  transformX=((transforms.split('translateY'))[1].split('translateX'))[0].slice(0,(transforms.split('translateY'))[1].split('translateX')[0].length-5);
  transformX=transformX.slice(1,transformX.length-5)
  if (xory='X') {
    return transformX;
  }
  if (xory='Y') {
    return transformY;
  }
  else {
    console.log("Fatal error on line 85.")
  }
}


function calcX(tileId) { //Used to parse the modulo values given in the Tile creation of newTile
  if(tileId==1) {
    return 1;
  }
  if(tileId==0){
    return 14;
  }
  else {
    return tileId;
  }
}
function calcY(tileId) { //See above... but for Y
  if(tileId%14==0) {
    return tileId/14;
  }
  else {
    return Math.floor(tileId/14+1);
  }
}

function getSessionID() //This is a placeholder function, to be replaced when the server is entirely running.
{
  /*
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://127.0.0.1:7000", false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
  */
  return Math.random()*10000;
  }
function getColor(values) {
  //Takes the color of a tile with a certain number and steals it from the cookie table
  return  JSON.parse($.cookie("colorTheme"))[values.toString()];
}
function darkOrLight(bgColor) { //Thanks https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 215) ?
    darkColor : lightColor;
}
var thedevil;
function jsonParser(miscommunication) {
  //Do something with the player values here
  thedevil=miscommunication;
  var goodboard={"players":{},"boxes":{}};
  for (let i=0;i<miscommunication.players.length;i++) { //Players stuff
    goodboard.players[i+1]=miscommunication.players[i];
    if (gamestarted==false) {
      players.push(miscommunication.players[i].name);
      document.getElementById("player"+myPlayerNum).classList.add("indigo");
      document.getElementById("player"+myPlayerNum).classList.remove("elegant-color-dark");
      }
    document.getElementById("player"+(i+1).toString()).innerHTML=miscommunication.players[i].name + "   " + "<span class=\"badge badge-primary badge-pill elegant-color \" id=\"player1sc\">"+miscommunication.players[i].score+"</span>";
  }
  //console.log(goodboard.players);
  //console.log(players)
  lockedBoxes=[];
  for (let j=0;j<miscommunication.boxes.length;j++) {
  //  console.log("found box"+(j+1));
  if (!miscommunication.boxes[j].enabled) {
    lockedBoxes.push(j+1);
  }
  //console.log(lockedBoxes);
  if (miscommunication.boxes[j].tileNum==0) { //Catch-all needs to be replaced soon
      continue;
    }


    testOb=miscommunication.boxes[j];
   //Ignore; bug fixing console.log(testOb)
   // tempID=miscommunication.boxes[j].tileId;
   totalB+=1
   asdf=testOb.tileId
   testOb.tileId=j+1;
    goodboard.boxes[asdf.toString()]=testOb;
  }
  drawLocked();
  // FOR NOW console.log("MRS:")
  console.log(goodboard)
  console.log("sacrebluwu")

  return (goodboard);

}

function divCleaner() { //Cleanup divs and make everything align
  for (i=0;i<eventuallyRemove.length;i++) {
  document.getElementById("tile"+eventuallyRemove[i]).remove();
  console.log("Removed tile"+eventuallyRemove[i]);
}
eventuallyRemove=[];
}
//Primary Functions


function silentNew(id, Box) {
  //console.log(Box);
//  document.getElementById("tile" + id).remove();
  var box=new Tile(id,calcX(Box.tileId%14),calcY(Box.tileId),Box.tileNum,Box.owner,Box.enabled);
    var tile_div=document.getElementById("tile" + id);
    tile_div.className='tile';
    tile_div.innerHTML=(box.value).toString()+"<div><div style=\"font-size:1vmin;transform: translate(0, -3.2vmin);\">"+players[Box.owner-1]+"</div></div>"
    tile_div.id='tile'+(box.id).toString();
    //grid.appendChild(tile_div);

   // document.getElementById('tile'+(Tile.id).toString()).style.transform="translate(1vmin,0vmin)" //Static transform to accomodate for the earlier margin one
    document.getElementById('tile'+(box.id).toString()).style.transform="translate("+(transformnumx*(box.x-1))+"vmin,"+((box.y-1)*transformnumy)+"vmin)" //Original position transform
    document.getElementById('tile'+(box.id).toString()).style.backgroundColor='#'+getColor(box.value);
    document.getElementById('tile'+(box.id).toString()).style.transform=document.getElementById('tile'+(box.id).toString()).style.transform+" translateX(0vmin)"+" translateY(0vmin)"; //Original position transform
    document.getElementById('tile'+(box.id).toString()).style.color='#'+darkOrLight(getColor(box.value));

    switch(Box.tileNum) {
      case(2):
      case(4):
      case(8):
          document.getElementById('tile'+(box.id).toString()).style.fontSize='2.5vmin'; //5 max
          document.getElementById('tile'+(box.id).toString()).style.lineHeight='5vmin';
          break;
      case(16):
      case(32):
      case(64):
        document.getElementById('tile'+(box.id).toString()).style.fontSize='2.5vmin'; //4.6 Max
        document.getElementById('tile'+(box.id).toString()).style.lineHeight='5vmin';
        break;
      case(128):
      case(256):
      case(512):
    //    document.getElementById('tile'+(box.id).toString()).style.marginLeft='255vmin'
        document.getElementById('tile'+(box.id).toString()).style.fontSize='2vmin'; // 2.8 max
        document.getElementById('tile'+(box.id).toString()).style.lineHeight='5vmin';
        break;  
      case(1024):
      case(2048):
      case(4096):
      case(8192):
         document.getElementById('tile'+(box.id).toString()).style.fontSize='2vmin'; // 2 max
         document.getElementById('tile'+(box.id).toString()).style.lineHeight='5vmin';
         break;    
     case(16384):
          document.getElementById('tile'+(box.id).toString()).style.fontSize='1.7vmin'; //1.5 optimal
          document.getElementById('tile'+(box.id).toString()).style.lineHeight='5vmin';
          break;
    }
    

  }








function newTile(id, Box) {
  //console.log(Box);
  var box=new Tile(id,calcX(Box.tileId%14),calcY(Box.tileId),Box.tileNum,Box.owner,Box.enabled);
    var tile_div=document.createElement('div');
    tile_div.className='tile';
    tile_div.innerHTML=(box.value).toString()+"<div><div style=\"font-size:1vmin;transform: translate(0, -3.2vmin);\">"+players[Box.owner-1]+"</div></div>"
    tile_div.id='tile'+(box.id).toString();
    grid.appendChild(tile_div);

   // document.getElementById('tile'+(Tile.id).toString()).style.transform="translate(1vmin,0vmin)" //Static transform to accomodate for the earlier margin one
    document.getElementById('tile'+(box.id).toString()).style.transform="translate("+(transformnumx*(box.x-1))+"vmin,"+((box.y-1)*transformnumy)+"vmin)" //Original position transform
    document.getElementById('tile'+(box.id).toString()).style.backgroundColor='#'+getColor(box.value);
    document.getElementById('tile'+(box.id).toString()).style.transform=document.getElementById('tile'+(box.id).toString()).style.transform+" translateX(0vmin)"+" translateY(0vmin)"; //Original position transform
    anime({
      targets: '#'+'tile'+(box.id).toString(),
      scale:[{
        value:[0,1],
        duration:300,
      },
    ],
    rotation:[{
      value:['20deg','-20deg','0deg'],
      duration:300,
    },
  ],
      backgroundColor: [{
        value:['#FFFFFF', '#'+getColor(box.value)],
        duration:300,
      },
    ],
    
      easing: 'linear',
      
    
    })
    document.getElementById('tile'+(box.id).toString()).style.color='#'+darkOrLight(getColor(box.value));

    switch(Box.tileNum) {
      case(2):
      case(4):
      case(8):
          document.getElementById('tile'+(box.id).toString()).style.fontSize='2.5vmin'; //5 max
          document.getElementById('tile'+(box.id).toString()).style.lineHeight='5vmin';
          break;
      case(16):
      case(32):
      case(64):
        document.getElementById('tile'+(box.id).toString()).style.fontSize='2.5vmin'; //4.6 Max
        document.getElementById('tile'+(box.id).toString()).style.lineHeight='5vmin';
        break;
      case(128):
      case(256):
      case(512):
    //    document.getElementById('tile'+(box.id).toString()).style.marginLeft='255vmin'
        document.getElementById('tile'+(box.id).toString()).style.fontSize='2vmin'; // 2.8 max
        document.getElementById('tile'+(box.id).toString()).style.lineHeight='5vmin';
        break;  
      case(1024):
      case(2048):
      case(4096):
      case(8192):
         document.getElementById('tile'+(box.id).toString()).style.fontSize='2vmin'; // 2 max
         document.getElementById('tile'+(box.id).toString()).style.lineHeight='5vmin';
         break;    
     case(16384):
          document.getElementById('tile'+(box.id).toString()).style.fontSize='1.7vmin'; //1.5 optimal
          document.getElementById('tile'+(box.id).toString()).style.lineHeight='5vmin';
          break;
    }
    

  }
function drawLocked() {
  $('.blocked').remove()
  
  for (let i=0;i<lockedBoxes.length;i++) {
    
    var blocked_tile=document.createElement('div');
    blocked_tile.className='blocked';
    blocked_tile.id='blocked'+lockedBoxes[i];
    grid.appendChild(blocked_tile);
    var transformnumx=5.741924954411;
    var transformnumy=5.748124954411;
    document.getElementById('blocked'+(lockedBoxes[i]).toString()).style.transform="translate("+(transformnumx*(calcX(lockedBoxes[i]%14)-1))+"vmin,"+(calcY(lockedBoxes[i])-1)*transformnumy+"vmin)" //Original position transform
    document.getElementById('blocked'+(lockedBoxes[i]).toString()).style.transform=document.getElementById('blocked'+(lockedBoxes[i]).toString()).style.transform+" translateX(0vmin)"+" translateY(0vmin)"; //Original position transform

  }
  $(".blocked").css("background-color","#"+JSON.parse($.cookie("boardTheme"))["blocked"])  
}


function moveTile(id,Tile,FutureTile) { //TIle is the tile as it sits NOW, FutureTile is where you want it to move.
  okayWork=false;
  var progress=0;
    //console.log("THE ID IS "+ id + Tile.tileId + FutureTile.tileId)
    console.log("Finding the current animation of " + id + ". It is: " + findCurrentAnim(id,"X"));
    anime({
      targets: '#'+'tile'+id,
      translateY:{
        
        value:[findCurrentAnim(id,"Y"),(((calcY(FutureTile.tileId))-calcY(Tile.tileId))*transformnumy).toString()+'vmin'],
        duration:1000,
    },
      translateX:{
        value:[findCurrentAnim(id,"X"),(((((calcX(FutureTile.tileId)%14))-(calcX(Tile.tileId)%14)))*transformnumx).toString()+'vmin'],        //value:[5.735*0,5.735*-13],
        duration:1000,
      },
  
      backgroundColor: [{
        value:['#'+getColor(Tile.tileNum),'#'+getColor(FutureTile.tileNum)],
        duration:300,
      }
    ],
    
      easing: 'easeInOutQuad',
      update: function() {
        progress+=1
        if (progress>40 && progress<50) {
          document.getElementById('tile'+(id).toString()).style.color='#'+darkOrLight(getColor(FutureTile.tileNum));
        document.getElementById('tile'+(id).toString()).innerHTML=(FutureTile.tileNum).toString()+"<div><div style=\"font-size:1vmin;transform: translate(0, -3.2vmin);\">"+players[FutureTile.owner-1]+"</div></div>"
        }
        if (progress>99) {
          silentNew(id,FutureTile);
          okayWork=true;
        }
      }
    
    
    })
    //document.getElementById('tile'+(Tile.id).toString()).innerHTML=(FutureTile.value).toString()+'\n'; This is a blanket update, the progress updater above will do a better job 99% of the time, but uncomment this if a corner-case arises
  }
function deleteTile(id, Tile) { //Play delete animation then kick that sorry thing off of the array.
  console.log("DELETING " +id)
  anime({
    targets: '#'+'tile'+id,
    scale:[{
      value:0,
      duration:300,
    },
  ],
  rotation:[{
    value:'1turn',
    duration:300,
  },
],
    backgroundColor: [{
      value:['#'+getColor(Tile.tileNum), '#FFFFFF'],
      duration:300,
    },
  ],
  
    easing: 'linear',
    
  
  })
  eventuallyRemove.push((id).toString());
  document.getElementById('tile'+id).remove();
}

function drawMovement(newBoard) {
board=newBoard;
oldnew= JSON.parse(JSON.stringify(newBoard));
  //Find Key Differences
newArrayKeys=(Object.keys(newBoard.boxes));
newArrayKeys=newArrayKeys.map(function (x) { 
  return parseInt(x, 10); 
});
console.log("THE NEW BOARD IS: "+ newArrayKeys)
//console.log(newArrayKeys)
currentArrayKeys=Object.keys(oldBoard.boxes);
currentArrayKeys=currentArrayKeys.map(function (x) { 
  return parseInt(x, 10); 
});
console.log("THE OLD BOARD IS: "+ currentArrayKeys)
//First, you find if there are any elements newArrayKeys has that the current one doesn't (additions)

additions=[]
additions=newArrayKeys.filter(x => !currentArrayKeys.includes(x))
console.log("Done adding " + additions)
//console.log(additions);
//Then, you check to see if there are any elements (by id) that the old array has and new doesn't  (deletions)
deletions=[]
console.log("The board will contain "+ newArrayKeys)
console.log("The board currently contains"+ currentArrayKeys)

deletions=currentArrayKeys.filter(x => !newArrayKeys.includes(x))

console.log("Done deleting " + deletions)

//console.log(deletions);
//Remove these from the lists; they'll be parsed seperately
//Parse Deletions
do{
  if (deletions.length>0) {
    deleteTile(deletions[0],oldBoard.boxes[deletions[0]]);
    deletions.shift();
  }
}while(deletions.length>0); 
do{
  if (additions.length>0) {
  newTile(additions[0],newBoard.boxes[additions[0]]);
  delete newBoard.boxes[additions[0]];
  delete currentArrayKeys[additions[0]];
  additions.shift();
  }
  }while(additions.length>0); 


ketamine=currentArrayKeys.filter(x => newArrayKeys.includes(x));;
console.log(ketamine);
var i=0;
  for (i in ketamine) {
    if (true /*idInCurrentArray(ketamine)[0]*/) {
      if (debug) {
      console.log("RECIEVED"+i)
      }
      console.log(ketamine[i] + 'SENT')
      moveTile(ketamine[i],oldBoard.boxes[ketamine[i]],newBoard.boxes[ketamine[i]]);
    //  console.log(Box)
    }
   }

  console.log("THE OLD BOARD WAS" + Object.keys(oldBoard.boxes))
  oldBoard=oldnew;
  console.log("THE OLD BOARD IS" + Object.keys(oldBoard.boxes))


}


//Listeners
document.addEventListener('keyup', function(event){
  var socket = new WebSocket('ws://127.0.0.1:8000'); 
  //alert(event.keyCode); (Uncomment this line if you need to add future keyswitch codes)
  if (true && gamestarted && okayWork) {
    switch(event.keyCode) {
      case 87:
      case 38:
        alert("Up! To be replaced by sockets when ready.");
        socket.send(JSON.stringify({
          msgType: "playerMove",
          direction: "up",
          sessionID:JSON.parse($.cookie("sessionID")).toString()
        }));
        if (debug) {console.log(
          JSON.stringify({
            msgType: "playerMove",
            direction: "up",
            sessionID:JSON.parse($.cookie("sessionID")).toString()
          }))
        }
        
        break;
      case 39:
      case 68:
          alert("Right! To be replaced by sockets when ready.");
          socket.send(JSON.stringify({
            msgType: "playerMove",
            direction: "right",
            sessionID:JSON.parse($.cookie("sessionID")).toString()
          }));
          if (debug) {console.log(
            JSON.stringify({
              msgType: "playerMove",
              direction: "right",
              sessionID:JSON.parse($.cookie("sessionID")).toString()
            }))
          }
          break;
      case 40:
      case 83:
          alert("Down! To be replaced by sockets when ready.");
          socket.send(JSON.stringify({
            msgType: "playerMove",
            direction: "down",
            sessionID:JSON.parse($.cookie("sessionID")).toString()
          }));
          if (debug) {console.log(
            JSON.stringify({
              msgType: "playerMove",
              direction: "down",
              sessionID:JSON.parse($.cookie("sessionID")).toString()
            }))
          }
          
          break;
      case 37:
      case 65:
          alert("Left! To be replaced by sockets when ready.");
          socket.send(JSON.stringify({
            msgType: "playerMove",
            direction: "left",
            sessionID:JSON.parse($.cookie("sessionID")).toString()
          }));
          if (debug) {console.log(
            JSON.stringify({
              msgType: "playerMove",
              direction: "left",
              sessionID:JSON.parse($.cookie("sessionID")).toString()
            }))
          }
          break;

    }
  }
} );
window.onload = function () {
//Random Jquery Stuff to keep site running
$('#title').on('click', function(event) {
  window.location.href = "index.html";
  console.log('home')
});


//Cookie Jar
if (document.cookie.indexOf('colorTheme')==-1) {
  $.cookie("colorTheme", JSON.stringify(theme1));
}

if (document.cookie.indexOf('boardTheme')==-1) {
    $.cookie("boardTheme", JSON.stringify(extraInfo));
}
$(".vline, .hline").css("background-color","#"+JSON.parse($.cookie("boardTheme"))["lineBorder"]);  
$(".grid").css("border","2vmin solid #"+JSON.parse($.cookie("boardTheme"))["lineBorder"]);  
$(".grid").css("background-color","#"+JSON.parse($.cookie("boardTheme"))["gridBackground"]);
darkColor=JSON.parse($.cookie("boardTheme"))["darkColor"];
lightColor=JSON.parse($.cookie("boardTheme"))["lightColor"];


  // Create a new WebSocket.
   //var socket = new WebSocket('ws://echo.websocket.org');
  var socket = new WebSocket('ws://127.0.0.1:8000'); 


  // Handle any errors that occur.
  socket.onerror = function (error) {
    console.log('WebSocket Error: ' + error);
  };


  // Show a connected message when the WebSocket is opened.
  socket.onopen = function (event) {
    console.log("Socket is connected.");
    if (document.cookie.indexOf('sessionID')==-1) {
      sessionID=getSessionID();
      $.cookie("sessionID", JSON.stringify(sessionID),{ expires: .005 });
   /* Uncomment this when you want cookie persistence
      socket.send(JSON.stringify({ //Modify this with cookies, to make sure one player gets reconnected with their correct session etc... and can't join several times.
      msgType: "signup",
      sessionID: sessionID.toString(),
      name: "Billy Bob"
    }));
    */
      }
      else {
        console.log(JSON.parse($.cookie("sessionID")))
        sessionID= JSON.parse($.cookie("sessionID"))
      }
    socket.send(JSON.stringify({ //Modify this with cookies, to make sure one player gets reconnected with their correct session etc... and can't join several times.
      msgType: "signup",
      sessionID: sessionID.toString(),
      name: "Player"+Math.floor(Math.random()*10)
    }));
  };

/*
<div class="alert alert-dark" role="alert">
  A simple dark alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
*/

  // Handle messages sent by the server.
  socket.onmessage = function (event) {
    if (debug) {console.log(event.data)};

    data=(JSON.parse(event.data));
    console.log(data.msgType)
    switch(data.msgType) {
      case 'boardUpdate':
        testBoard=jsonParser(data.board)
        $.cookie("lastBoard", JSON.stringify(testBoard)); //Also log currentArray, somehow, in order to redraw smooothly.
        //console.log(testBoard);
        drawMovement(testBoard);
        gamestarted=true;
        recentboard=jsonParser(data.board);
        break
      case 'waitingForPlayers':
        if (myPlayerNum==4) {
          myPlayerNum=4-data.numLeft;
          changemade=true;
        }
        if (gamestarted==false) {
          document.getElementById("player"+myPlayerNum).classList.add("indigo");
          document.getElementById("player"+myPlayerNum).classList.remove("elegant-color-dark");
          }
          if(!$("#googlymoogle").length) {
            var alert = document.createElement('div');
            alert.className='alert alert-dismissible alert-dark fade show';
            alert.id='googlymoogle'
            alert.role="alert";
            alert.innerHTML="Welcome to the queue. We are currently waiting on "+data.numLeft+" players. Thank you for your patience.";
            document.getElementById("alertCenter").appendChild(alert);
      }
      else {
        document.getElementById("googlymoogle").innerHTML="Welcome to the queue. We are currently waiting on "+data.numLeft+" players. Thank you for your patience.";
      }
      if (data.numLeft==0) {
        $('#googlymoogle').alert('close');
      }
      $('#googlymoogle').on('click', function(event) {
        $('#googlymoogle').alert('close');
      })
      break;
      case 'gameStarting':
          gamestarted=false;
          changemade=true;
          if(!$("#googlymoogle").length) {
            $('#googlymoogle').alert('close');
          }
          break;
      case 'ERR':
        console.log(data);
        console.log("FATAL ERROR IN WEBSOCKET- COLLECTING LOG");
        break;
      case 'gameOver':
        //Delete Cookies
      
         
  };


  // Show a disconnected message when the WebSocket is closed.
  socket.onclose = function (event) {
    console.log("Socket is disconnected");
    var socket = new WebSocket('ws://127.0.0.1:8000'); 
  };
  


 //Send a signup request as soon as the socket is connected


};

}
