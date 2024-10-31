import React,{useState} from "react";

function PhoneBook2()
{
    
    const[phonebook,setPhonebook] = useState([]); //array of object {name:Faiz ,phno:234} ,{name:jeni,phno:2345}
    const[entry,setEntry]=useState({
        name:" ",
        phno: " "
    })

    
    const handleChange = (e) =>
     {
       // const {name, value } = e.target;      --> Destructing in java
       const name = e.target.name;  // it will assign name of input elemnt --> name
       const value = e.target.value; //it will assign value of input elemnt --> ex:Faiz banu

       setEntry(prevEntry => ({ ...prevEntry, [name]: value }));  //name:Faiz banu
    };

    const addEntry = () => {              
        setPhonebook(prevPhonebook => [...prevPhonebook, entry]); 
        setEntry({ name: "", phno: "" }); 
    };

    return (
        <div className="container">

           <h1>Phone Book</h1>
            <input type = "text"  name = "name" placeholder="Enter your Full name "  value = {phonebook.username} onChange={(e) => handleChange(e)}/>   {/* for username */}
            <input type = "text"  name = "phno"  placeholder="Enter your Mobile number" value = {phonebook.phno} onChange={(e) => handleChange(e)}/>   {/* for username */}

            <button onClick={addEntry}>Add Entry</button>

            
        
             <ui>
             {phonebook.map((entry, index) => (
                    <li key={index}>
                        {entry.name}: {entry.phno}
                    </li>
                ))}

      
            </ui> 




        </div>
    )
}

export default PhoneBook2;



        