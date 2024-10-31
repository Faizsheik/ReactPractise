import React,{useState,useEffect} from "react";

function CountNumbers2 ({countfromparent})
{
    const[count,setCount] = useState(countfromparent);

    useEffect(()=>
      {
        setCount(countfromparent)
      },
        [countfromparent]        
    );



    return (
        <div>
            <input type = "text" value = {count} readOnly></input>
            {/* <button onClick={()=>setCount(count+1)}>Increase count - child</button>  */}
            
        </div>
    )
}

export default CountNumbers2;