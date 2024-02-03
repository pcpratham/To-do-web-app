import React, { useEffect, useState } from 'react'
import ShowAllTasks from './ShowAllTasks';
import { MdDelete } from "react-icons/md";


const TaskEntry = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [userTasks, setUserTasks] = useState([]);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });

    }
    const api = process.env.REACT_APP_API_URL;

    function getAllToDo() {
        const token = localStorage.getItem('token');
        try {
            fetch(`${api}` + "/api/v1/get-todo", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(r => r.json())
                .then(d => {
                    // console.log("success ", d);
                    setUserTasks(d?.data);
                })
                .catch((err) => {
                    console.log("Error in getting all todo's")
                    console.log(err);
                })
        }
        catch (err) {
            console.log("Error in getting todo's entry");
            console.log(err);
        }
    }

    function deleteHandler(entry){
        // console.log("clicked hua h");
        const token = localStorage.getItem('token');
        const jsonObj = {
            id : entry._id
        }
        // console.log(JSON.stringify(jsonObj));
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
                // console.log("Success ",data);
                getAllToDo();
            })
        }
        catch(err){
            console.log("Error in deleting this task")
            console.log(err);
        }
    }

    useEffect(() => {
        getAllToDo()
    }, []);

    function submitHandler(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            fetch(`${api}` + "/api/v1/create-todo", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(formData)
            })
                .then(r => r.json())
                .then(d => {
                    // console.log("success ", d);
                    getAllToDo();
                })
                .catch((err) => {
                    console.log("Error in api call to do")
                    console.log(err);
                })
        }
        catch (err) {
            console.log("Error in creating entry");
            console.log(err);
        }
    }

    return (
        <div className='flex flex-col gap-8'>
            <form onSubmit={submitHandler} className='flex flex-col items-center justify-center gap-8 '>

                <input type='text' placeholder='Enter the Title' name='title' value={formData.title} onChange={changeHandler} className='border-2 rounded-lg border-gray-600 shadow-2xl text-center placeholder:text-center placeholder:text-xl text-xl placeholder:font-semibold' />


                <input type='text' placeholder='Enter the description' name='description' value={formData.description} onChange={changeHandler} className='border-2 rounded-lg border-gray-600 shadow-2xl text-center placeholder:text-center placeholder:text-xl text-xl placeholder:font-semibold' />

                <button type="submit" className='border-2 rounded-md p-2 font-semibold border-blue-600 text-white bg-blue-600 hover:bg-blue-400 transition-all'>Create Task</button>
            </form>

            <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className='text-xl font-bold text-pink-700'> Here is the list of all your tasks   </h1>
                {
                    userTasks.map((t) => {
                        return (
                            <div key={t._id} className='flex items-center justify-evenly w-[300px] px-4 py-2 gap-4 border-2 border-gray-400 rounded-lg'>
                                <div className='w-[80%]'>
                                    <h1 className='text-xl font-bold text-green-700 '>{t.title}</h1>
                                    <p className='text-md font-semibold'>{t.description}</p>
                                </div>
                                <div className='w-[20%]'>
                                    <MdDelete className='text-xl cursor-pointer hover:scale-125 transition-all ' onClick={() => { deleteHandler(t) }} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TaskEntry