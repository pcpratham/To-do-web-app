import React from 'react'
import { MdDelete } from "react-icons/md";
import { json } from 'react-router-dom';

const ShowAllTasks = (props) => {
    const userTasks = props.userTasks;
    const api = process.env.REACT_APP_API_URL;

    function deleteHandler(entry){
        console.log("clicked hua h");
        const token = localStorage.getItem('token');
        const jsonObj = {
            id : entry._id
        }
        console.log(JSON.stringify(jsonObj));
        try{
            fetch(`${api}`+"/api/v1/update-todo",{
                method:"PUT",
                headers:{
                    'Content-Type' : "application/json",
                    'Authorization' : "Bearer " + token
                },
                body: JSON.stringify(jsonObj)
            })
            .then(r=>r.json())
            .then((data)=>{
                console.log("Success ",data);
            })
        }
        catch(err){
            console.log("Error in deleting this task")
            console.log(err);
        }
    }
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-xl font-bold text-pink-700'> Here is the list of all your tasks   </h1>
        {
            userTasks.map((t)=>{
                return (
                    <div key={t._id} className='flex items-center justify-evenly w-[300px] px-4 py-2 gap-4 border-2 border-gray-400 rounded-lg'>
                        <div>
                            <h1 className='text-xl font-bold text-green-700 '>{t.title}</h1>
                            <p className='text-md font-semibold'>{t.description}</p>
                        </div>
                        <div>
                            <MdDelete className='text-xl cursor-pointer' onClick={()=>{deleteHandler(t)}}  />
                        </div>
                    </div>
                )
            })
        }
    </div>

  )
}

export default ShowAllTasks