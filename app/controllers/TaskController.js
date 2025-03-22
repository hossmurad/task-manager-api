import TasksModel from "../model/TasksModel.js";
import mongoose from "mongoose";
import tasksModel from "../model/TasksModel.js";



export const CreateTask = async(req, res) => {
    try {
        let user_id=req.headers['user_id']
        let requestBody=req.body;
        requestBody.user_id=user_id;
        await TasksModel.create(requestBody)
        return res.json({status:"success",message:"Task successfully"})
    }catch (e) {
        return res.json({status:"fail",message:e.toString()});
    }

}






// Update task status using expess
export const UpdateTaskStatus= async(req, res) => {
    try {
        let id=req.params.id;
        let status=req.params.status;
        let user_id=req.headers['user_id']
        await TasksModel.updateOne({"_id":id,"user_id":user_id},{
            status:status
        })
        return res.json({status:"success",message:"Task Update successfully"})
    }
    catch (e) {
        return res.json({status:"fail",message:e.toString()})
    }
}





//fine list by status

export const TaskListByStatus = async(req, res) => {
    try{
        let user_id=req.headers['user_id'];
        let status = req.params.status;
        let data = await  tasksModel.find({user_id:user_id, status: status});
        return res.json({status:"success",message:"Task List",data:data})
    }catch (e) {
        return res.json({status:"fail",message:e.toString()})
    }
}





//delete a task from database

export const DeleteTask = async(req, res) => {
    try{
        let user_id = req.headers['user_id'];
        let id=req.params.id;

        await TasksModel.deleteOne({"_id":id,"user_id":user_id})
        return  res.json({status:"success",message:"Task Delete successfully"})
    }catch (e) {
       return res.json({status:"fail",message:e.toString()})
    }
}





// Count total task using express

export const CountTask = async (req, res) => {
    try {
        let user_id = req.headers['user_id'];
        let total = await TasksModel.countDocuments({ user_id }); 

        return res.json({ status: "success", message: "Count successful", total });
    } catch (e) {
        return res.json({ status: "fail", message: e.message });
    }
};


