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

module.exports = {
    createTask
}