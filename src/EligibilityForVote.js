import React ,{useState}from "react";

function VoteEligibility()
{
    const[age,setAge] = useState(0);
    const[eligibility,setEligible] = useState('');

    function calculateage(age)
    {
       if(age >= 18)
       {
           setEligible("Yes,Eligible for vote!")   //we can also choose component and choose which one to render
           //return <yes/>  
       }
       else
       {
        setEligible("No,Not eligible for vote!")
        //return <no/>
       }
    }
      
    return(   //React element should always return from the render() method
        <div>
            <label>Enter your age</label>
            <input type = "text" value = {age} onChange={(e)=>setAge(e.target.value)} />
            <button onClick={(e)=>{calculateage(age)}} >Check your eligibilty</button>
            <textarea value={eligibility} />

        </div>
    )

}
export default VoteEligibility;

//there is also conditional rendering


