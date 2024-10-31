import React,{useState} from "react";
import './Form.css';

function Form()
{
    const [FormFields,setFormfields] = useState({
        firstname:"",
        lastname:"",
        age:0,
        phonenumber:"",
        gender:"",  
        state:"",
        emailid:"",
       document:"",
        about:""


    })


    const handleChange = (e) =>
    {
        const name = e.target.name;
        const value = e.target.value;

        setFormfields(prevformfields=>({...prevformfields,[name]:value}))

    }

    const handleSubmit = (e) =>
    {
       e.preventDefault()
       console.log(FormFields)

    }


    return(
        <div className="container">

            <h1>Form in React</h1>
           
           <form onSubmit={handleSubmit}> 
           <label htmlFor="firstname">First Name :</label>
            <input type = "text" value={FormFields.firstname} name ="firstname" onChange={(e)=>handleChange(e)} />
            
            <label htmlFor="lastname">Last Name :</label>
            <input type = "text" value={FormFields.lastname} name ="lastname" onChange={(e)=>handleChange(e)} />

            <label htmlFor="age">Age :</label>
            <input type = "number" value={FormFields.age} name ="age"  onChange={(e)=>handleChange(e)}/>

            <label htmlFor="phonenumber">Phone Number :</label>
            <input type = "text" value={FormFields.phonenumber} name ="phonenumber" onChange={(e)=>handleChange(e)}  />

            <label htmlFor="gender">Gender :</label>
            <input type = "radio"  name ="gender"  onChange={(e)=>handleChange(e)} />Male
            <input type = "radio"  name ="gender"  onChange={(e)=>handleChange(e)} />Female
            <input type = "radio"  name ="gender"  onChange={(e)=>handleChange(e)} />Transgender

            <label htmlFor="state" >State :</label>
            <select name = "state" value={FormFields.state} onChange={(e)=>handleChange(e)}>
                <option value="Tamilnadu">Tamilnadu</option>
                <option value="Kerala">Kerala</option>
            </select>


            <label htmlFor="email">email Address :</label>
            <input type = "email" value={FormFields.emailid} name ="email" onChange={(e)=>handleChange(e)} />
      
            <label htmlFor="resume">Upload Resume :</label>
            <input type = "file" value={FormFields.document} name ="resume" onChange={(e)=>handleChange(e)} />


            <label htmlFor="about"> About:</label>
           <textarea name = "about" value={FormFields.about} cols="30" rows="10" onChange={(e)=>handleChange(e)}></textarea>

           <button type="submit">submit</button>
           </form>

        
        </div>
    )

}

export default Form;