const Task = require("../models/task");


const createTask = async(req,res)=>{
    const userId = req.userId;
    const{title,description} = req.body;
    if(!title || !description){
        res.status(401).json({
            msg:"Please enter all the required entries"
        });
        return;
    }

    const newTask = await Task.create({
        user:userId,
        title:title,
        description:description
    });

    return res.status(200).json({
        msg:"task created successfully",
        data:newTask
    });



}

const getToDo = async(req,res)=>{
    const userId = req.userId;
    const tasks = await Task.find({user:userId});
    return res.status(200).json({
        msg:'All tasks fetched successfully',
        data:tasks
    });
}

const updateToDo = async(req,res) => {
    const userId = req.userId;
    const {id} = req.body;
    const updateTask = await Task.findByIdAndUpdate({_id:id},{completed:true},{new:true});
    return res.status(200).json({
        msg:'Goal updated succesfully',
        data:updateTask
    });
}

module.exports = {
    createTask,
    getToDo,
    updateToDo
}