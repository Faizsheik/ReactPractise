import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import styles from './ToDoList.module.css';
import {Input,Button,Divider,Modal,Select,Tag,Tooltip,message,Empty} from 'antd';
import { getErrorMessage } from '../../util/GetError';
import { getUserDetails } from '../../util/GetUser';
import ToDoServices from '../../services/toDoServices';
import { useNavigate } from 'react-router';
import { CheckCircleFilled, CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';






function ToDoList() {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [isAdding,setIsAdding] = useState(false);
  const[loading,setLoading] = useState(false);

  const[allToDo,setAllToDo] = useState([]);

  const[isEditing,setIsEditing] = useState(false);
  const[updatedTitle,setUpdatedTitle] = useState("");
  const[updatedDescription,setUpdatedDescription] = useState("");
  const[updatedStatus,setUpdatedStatus] = useState("");
  const [currentEditItem,setCurrentEditItem] = useState("");

  const[currentTaskType,setCurrentTaskType] = useState("incomplete");
  const[completedToDo,setCompletedToDo] = useState([]);
  const[incompletedToDo,setIncompletedToDo] = useState([]);
  const[currentTodoTask,setCurrentToDoTask] = useState([]);
  const[filteredToDo,setFilteredToDo] = useState([]);



  const navigate = useNavigate();

  const getAllToDo = async () =>
  {
    try
    {

      let user = getUserDetails();   //login info stored in localstorage with tokem
      console.log(user?.userId);
      const response = await ToDoServices.getAllToDo(user?.userId);
      console.log(response.data);
      setAllToDo(response.data);
    }
    catch(err)
    {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  }

  useEffect(()=>
    {
        let user = getUserDetails();
          const getAllToDo = async ()=>
            {
            try
            {
              console.log(user?.userId);
              const response = await ToDoServices.getAllToDo(user?.userId);
              console.log(response.data);
              setAllToDo(response.data);
            }
            catch(err)
            {
              console.log(err);
              message.error(getErrorMessage(err));
            }
          }
        if(user && user?.userId){
          getAllToDo();
        }else{
          navigate('/login');
        }
  
    },[navigate]);


   

  useEffect(()=>
  {
    const incomplete = allToDo.filter((item)=>item.isCompleted === false);
    const complete = allToDo.filter((item)=>item.isCompleted === true);
    setIncompletedToDo(incomplete);
    setCompletedToDo(complete);
    if(currentTaskType==='incomplete')
    {
      setCurrentToDoTask(incomplete);
    }
    else
    {
      setCurrentToDoTask(complete);
    }
  },[allToDo])


  const handleSubmitTask = async () =>
  {
    setLoading(true);
    try
    {
      const userId = getUserDetails()?.userId;
       const data = 
       {
        title,
        description,
        isCompleted:false,
        createdBy: userId //createdBy
       }
       const response = await ToDoServices.createToDo(data);
       console.log(response.data);
       setLoading(false);
       message.success("To Do task added successfully");
       setIsAdding(false);
       getAllToDo();
    }
    catch(err)
    {
      console.log(err);
      setLoading(false);
      message.error(getErrorMessage(err))
    }
  }


  const getFormattedDate = (value)=>{
    let  date = new Date(value);
    let dateString = date.toDateString();
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = `${dateString} at ${hh}:${min}:${ss}`;
    return finalDate;
  }



  const handleEdit = (item)=>
  {
    console.log(item);
    setCurrentEditItem(item);
    setUpdatedTitle(item?.title);
    setUpdatedDescription(item?.description);
    setUpdatedStatus(item?.isCompleted);
    setIsEditing(true);
  };


  const handleDelete = async (item)=>
  {
    try{
      const response = await ToDoServices.deleteToDo(item._id);
      console.log(response.data);
      message.success(`${item.title} is Deleted Successfully!`);
      getAllToDo();
    }catch(err){
      console.log(err);
      message.error(getErrorMessage(err));
    }
  }


  const handleUpdateStatus = async (id,status)=>
  {
    console.log(id);
    try{
      const response = await ToDoServices.updateToDo(id,{isCompleted:status});
      console.log(response.data);
      message.success("Task Status Updated Successfully!");
      getAllToDo();
    }catch(err){
      console.log(err);
      message.error(getErrorMessage(err));
    }
  }


  const handleUpdateTask = async ()=>
  {
    try
    {
      setLoading(true);
      const data = 
      {
        title:updatedTitle,
        description:updatedDescription,
        isCompleted:updatedStatus
      };
      console.log(data);
      const response = await ToDoServices.updateToDo(currentEditItem?._id,data);
      console.log(response.data);
      message.success(`${currentEditItem?.title} Updated Successfully!`);
      setLoading(false);
      setIsEditing(false);
      getAllToDo();
    }catch(err){
      console.log(err);
      setLoading(false);
      message.error(getErrorMessage(err))
    }
}




const handleTypeChange = (value)=>
{
  console.log(value);
  setCurrentTaskType(value);
  if(value==='incomplete')
  {
    setCurrentToDoTask(incompletedToDo);
  }
  else
  {
    setCurrentToDoTask(completedToDo);
  }
}

const handleSearch = (e)=>
{
  let query = e.target.value;
  let filteredList = allToDo.filter((item)=>item.title.toLowerCase().match(query.toLowerCase()));
  console.log(filteredList);
  if(filteredList.length > 0 && query){
    setFilteredToDo(filteredList);
  }
  else{
    setFilteredToDo([]);
  }
}


  return (
    <div>
      <Navbar active={"myTask"}/>
      <section className={styles.toDoWrapper}>


        <div className={styles.toDoHeader}>
          <h2>Your Tasks</h2>
          <Input style={{width:'50%'}} onChange={handleSearch}placeholder='Search Your Task here'/><br></br>
          <div>
            <Button type="primary"  onClick={()=>setIsAdding(true)} size="large"> Add Task</Button>
            <Select 
            value={currentTaskType}
            style={{width:180,marginLeft:'10px'}}
            onChange={handleTypeChange}
            size="large"

            options={[
              {value:"incomplete",label:'Incomplete'},
              {value:"complete",label:'Complete'}
            ]}

            />

          </div>
        </div>



    <Divider/>         {/* lite horizontal line - divider */}
    
    <div className={'styles.toDoListCardWrapper'}>

      {filteredToDo.length>0 ? filteredToDo.map((item)=>

      {

        return(

          <div key={item?._id} className={styles.toDoCard}>

            <div>

              <div className={styles.toDoHardHeader}>

                <h3>{item?.title}</h3>
                {item?.isCompleted?
                <Tag color="cyan" >Completed</Tag> 
                :
                <Tag color="red">InCompleted</Tag>
                }

              </div>
              
              <p>{item?.description}</p>

            </div>


            <div className={styles.toDoCardFooter}>

              <Tag>{getFormattedDate(item?.createdAt)}</Tag>
              <div className={styles.toDoFooterAction}>
                <Tooltip title="Edit Task?">
                  <EditOutlined onClick={()=>handleEdit(item)} className={styles.actionIcon}></EditOutlined>
                </Tooltip>

                <Tooltip title="Delete Task?">
                  <CheckCircleFilled onClick={()=>{handleUpdateStatus(item._id,true)}} className={styles.actionIcon}/>
                </Tooltip>
              </div>

            </div>
            </div>
        )

      }) 
      :

      currentTodoTask.length>0 ? currentTodoTask.map((item)=>
      {
        return(
          <div key={item?._id} className={styles.toDoCard}>

            <div>

              <div className={styles.toDoCardHeader}>
                <h3>{item?.title}</h3>
                {item?.isCompleted 
                  ?
                  <Tag color="cyan">Completed</Tag>
                  :
                  <Tag color="red">Incomplete</Tag>
                }
                <p>{item?.description}</p>
              </div>

            </div>


   
            <div className={styles.toDoCardFooter}>
                 <Tag>{getFormattedDate(item?.createdAt)}</Tag>

                      <div className={styles.toDoFooterAction}>
                        <Tooltip title="Edit Task?"><EditOutlined onClick={()=>handleEdit(item)} className={styles.actionIcon} /></Tooltip>
                        <Tooltip title="Delete Task?"><DeleteOutlined onClick={()=>handleDelete(item)} style={{color:'red'}}   className={styles.actionIcon}/></Tooltip>
                        {
                              item?.isCompleted ? 
                              <Tooltip title="Mark as Incomplete"><CheckCircleFilled onClick={()=>handleUpdateStatus(item._id,false)} style={{color:'green'}}  className={styles.actionIcon} /></Tooltip>
                              :
                              <Tooltip title="Mark as Completed"><CheckCircleOutlined onClick={()=>handleUpdateStatus(item._id,true)}  className={styles.actionIcon}/></Tooltip>
                        }
                      </div>  
              </div>

            </div>
          
          
        )
      })
      :
      <div className={styles.noTaskWrapper}>
        <Empty/>
        </div>
}
    </div>
      
    

      
      
    
    

       
       





       
       
       
        {/* modal is like a pop up */}

        <Modal 
        confirmLoading={loading} 
        title="Add new To Do task" 
        open={isAdding}    
         onOk={handleSubmitTask}
         onCancel={()=>setIsAdding(false)}>

        <Input style={{marginBottom:'1rem'} }
        placeholder='Title'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />

        <Input.TextArea style={{marginBottom:'1rem'}}
        placeholder='Description'
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />

        </Modal>



        <Modal   
        confirmLoading={loading}
        title={`Update ${currentEditItem.title}`} 
        open={isEditing}
        onOk = {handleUpdateTask}
        onCancel={()=>setIsEditing(false)}
        >

          <Input style={{marginBottom:'1rem'}}
          placeholder='Updated Title'
          value={updatedTitle}
          onChange={(e)=>setUpdatedTitle(e.target.value)}
          />

          <Input.TextArea style={{marginBottom:'1rem'}}
          placeholder='Updated Description'
          value={updatedDescription}
          onChange={(e)=>setUpdatedDescription(e.target.value)}
          />


          <Select 

          onChange={(value)=>setUpdatedStatus(value)}
          value={updatedStatus}
          options={
            [

              {
                value:false,
                label:'Not Completed',
              },

              {
                value:true,
                label:'Completed'
              }
            ]
          }

          />

        </Modal>


      </section>
    </div>
  )
}

export default ToDoList