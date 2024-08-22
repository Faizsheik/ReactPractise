import React,{useState} from "react";  //parent component for CountNumbers2.mjs
import CountNumbers2 from './CountNumbers2.mjs';

function CountNumbers()
{
    const [count,setCount] = useState(0);  //count --> state variable setCount is the function name i.e function returned by the useState.

    return(

        <div>
              
              {/* <input type="text" value={count}></input> */}
              <button onClick={()=>setCount(count+1)}>IncreaseCount(FROM PARENT)</button>
              <CountNumbers2 countfromparent={count}/>
              

        </div>
    );

    
}

export default CountNumbers;