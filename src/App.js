import React, {useState,useEffect} from 'react'
import styled from "styled-components"

const WALL_HEIGHT=600;
const WALL_WIDTH=400;
const BIRD_HEIGHT=28;
const BIRD_WIDTH=33;
const GRAVITY=8;
const OBJ_WIDTH=52;
const OBJ_GAP=200;
const OBJ_SPEED=6;

const App = () => {

  const [birdpos, setbirdpos] = useState(300);
const [isStart,setIsstart]=useState(false);
const [objHeight,setObjHeight]=useState(0);
const [objPos,setObjPos]=useState(WALL_WIDTH);
const [score,setScore]=useState(0);

//const bottomObj=WALL_HEIGHT-OBJ_GAP-objHeight;

useEffect(()=>{
  let birdval;
  if(isStart && birdpos<WALL_HEIGHT-BIRD_HEIGHT){
  birdval=setInterval(()=>{
    setbirdpos((birdpos)=>birdpos+GRAVITY);
  },24);
}
return ()=>clearInterval(birdval);
});

useEffect(()=>{
  let objVal;
  if(isStart && objPos>= -OBJ_WIDTH){
  objVal=setInterval(()=>{
   setObjPos((objPos)=>objPos-OBJ_SPEED)
  },24);
  return ()=>{ clearInterval(objVal)};
}
else{
  setObjPos(WALL_WIDTH);
  setObjHeight(Math.floor(Math.random()*(WALL_HEIGHT-OBJ_GAP)));
  if(isStart) setScore((score)=>score+1);
}

},[isStart,objPos]);


useEffect(()=>{
  let topObj=birdpos>=0 && birdpos<objHeight;
  let bottomObj=birdpos<=WALL_HEIGHT &&
   birdpos>=WALL_HEIGHT-(WALL_HEIGHT-OBJ_GAP-objHeight)-BIRD_HEIGHT;


  if(
    objPos>=OBJ_WIDTH &&
    objPos<=OBJ_WIDTH+80 && 
    (topObj || bottomObj)){
    setIsstart(false);
    setbirdpos(300);
    setScore(0);
  }
},[birdpos,objHeight,isStart,objPos]);

const handler=()=>{

  if(!isStart)setIsstart(true);
  else if(birdpos<BIRD_HEIGHT){
    setbirdpos(0);
  }
  else{
  setbirdpos((birdpos)=>birdpos-50);
  }
};

  return (
    
    <Home onClick={handler}>
    <ScoreShow>
      Score:{score}
    </ScoreShow>
      <Background height={WALL_HEIGHT}
      width={WALL_WIDTH}
      >
         {!isStart ? <Startgame>Click to Start</Startgame> : null}
        
         <Obj 
        height={objHeight}
        width={OBJ_WIDTH}
        left={objPos}
        top={0}
        deg={180}
        />
        <Bird
        height={BIRD_HEIGHT}
        width={BIRD_WIDTH}
        top={birdpos}
        left={100}
        />
     
        <Obj 
        height={WALL_HEIGHT - OBJ_GAP - objHeight}
        width={OBJ_WIDTH}
        left={objPos}
        top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
        deg={0}
        />
      </Background>
    </Home>
  )
}

export default App

const Home=styled.div`
height:100vh;
display: flex;
justify-content: center;
align-items: center;
`;


const Background=styled.div`
background-image: url("./background-day.png");
background-repeat: no-repeat;
background-size: ${(props) => props.width}px ${(props) => props.height}px ;
width: ${(props) => props.width}px;
height: ${(props) => props.height}px;
border: 2px solid black;
position: relative;
overflow: hidden;
`;

const Bird=styled.div`
position: absolute;
background-image: url("./yellowbird-upflap.png");
background-repeat: no-repeat;
background-size: ${(props) => props.width}px ${(props) => props.height}px ;
width: ${(props) => props.width}px;
height: ${(props) => props.height}px;
top: ${(props) => props.top}px;
left:  ${(props) => props.left}px;
`;

const Startgame=styled.div`
text-align: center;
position: relative;
top: 49%;
background-color: black;
padding: 10px;
width: 100px;
left: 50%;
margin-left: -55px;
text-align: center;
color: #fff;
font-size: 20px;
border-radius: 10px;

`;

const Obj=styled.div`
position: relative;
background-image: url("./pipe-green.png");
width: ${(props) => props.width}px;
height: ${(props) => props.height}px;
top: ${(props) => props.top}px;
left:  ${(props) => props.left}px;
transform: rotate(${(props) => props.deg}deg);
`;

const ScoreShow=styled.div`
text-align: center;
background:transparent;

`;