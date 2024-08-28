import React,{useState} from "react";

function PhoneBook()
{
    //const phonebook = [
    // name : Faiz banu ,
    // phoneno:8978799770
    //]
    const[phonebook,setPhonebook] = useState({
        username:" ",
        phno: " "
});

    

    const handleChange = (e) =>
    {
        const name = e.target.name;
       const value = e.target.value;
        setPhonebook(values => ({...values,[name]:value}))
    }

    return (
        <div className="container">

           <h1>Phone Book</h1>
            <input type = "text"  name = "username" placeholder="Enter your Full name " value = {phonebook.username} onChange={(e) => handleChange(e)}/>   {/* for username */}
            <input type = "text"  name = "phno"  placeholder="Enter your mobile number " value = {phonebook.phno} onChange={(e) => handleChange(e)}/>   {/* for username */}
            <textarea 
                value={`Name: ${phonebook.username}, Phone: ${phonebook.phno}`} 
                
            />
            

           
            {/* <ui>
                {phonebook.map((details)=>(
                    <li key = {details.phnp}>
                        {details.username}:{details.phno}
                    </li>
                ))}
            </ui> */}




        </div>
    )
}

export default PhoneBook;



        