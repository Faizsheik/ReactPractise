import React,{ useState} from 'react';

function ArithmeticOperations()
{
  const[num1,setNum1] = useState();
  const[num2,setNum2] = useState();
  const[result,setResult] = useState();

  function sum()
  {
      return num1+num2;
  }

  function sub()
  {
    return num1-num2;
  }

  function multiply()
  {
      return num1*num2;
  }

  function div()
  {
      return num1/num2;
  }

  return(
    <div style={{ border: '2px solid black', padding: '20px', display: 'inline-block', marginTop:'10px'}}>
        <div >
            <input type ='text'
            onChange={(e) => setNum1(Number(e.target.value))} 
            value = {num1} placeholder='Number1'
            style={{ margin: '0 10px' }} />

            <input type = 'text' 
            onChange={(e) => setNum2(Number(e.target.value))} 
            value= {num2} placeholder='Number2'
            style={{ margin: '0 10px' }} />

            <input type = 'text' value={result} readOnly placeholder='RESULT'/>
        </div>

        <div style={{ marginTop: '20px' }}  >   
            <button onClick={()=>setResult(sum())}  style={{ margin: '0 10px' }}>ADD</button>
            <button onClick={()=>setResult(sub())}  style={{ margin: '0 10px' }}>SUB</button>
            <button onClick={()=>setResult(multiply())}  style={{ margin: '0 10px' }}>MUL</button>
            <button onClick={()=>setResult(div())}  style={{ margin: '0 10px' }}>DIV</button>
        </div>

    </div>
    
  );


}

export default ArithmeticOperations;

