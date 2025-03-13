function Square({value}) {
    return <button className="square">value</button>;
  }

export default function Board(){
   return(
    <> 
    <div className = "board-row">
     <Square/>
     <Square/>
     <Squarequare/>
     </div>

     <div className = "board-row">
     <Square/>
     <Square/>
     <Square/>
     </div>

    <div className = "board-row">
    <Square/>
    <Square/>
    <Square/>
     </div>
</>
   );
}
