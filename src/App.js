function Square() {
    return <button className="square">1</button>;
  }

export default function Board(){
   return(
    <> 
    <div className = "board-row">
     <square/>
     <square/>
     <square/>
     </div>

     <div className = "board-row">
     <square/>
     <square/>
     <square/>
     </div>

    <div className = "board-row">
    <square/>
    <square/>
    <square/>
     </div>
</>
   );
}
