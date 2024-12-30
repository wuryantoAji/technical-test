import Attendances from "../models/AttendanceModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getAllAttendance = async (request, response) => {
    try {
        let dbResponse;
        if (request.role === "admin") {
            dbResponse = await Attendances.findAll({
                attributes: ['uuid', 'photoFile', 'clockIn', 'clockOut'],
                include:[{
                    model: Users,
                    attributes:['name', 'email', 'role']
                }]
            });
        }else{
            dbResponse = await Attendances.findAll({
                attributes: ['uuid', 'photoFile', 'clockIn', 'clockOut'],
                where: {
                    userId: request.userId
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email', 'role']
                }]
            });
        }
        response.status(200).json(dbResponse);
    } catch (error){
        response.status(500).json({msg: error.message});
    }
}

export const createAttendance = async (request, response) => {
    const { photoFile } = request.body;
    try {
        await Attendances.create({
            photoFile: photoFile,
            clockIn: Date.now,
            userId: request.userId
        });
        response.status(201).json({msg: "Attendances has been created "});
    } catch (error) {
        response.status(500).json({msg: error.message});
    }
}

export const updateAttendance = async (request, response) => {
    try {
        const attendance = await Attendances.findOne({
            where:{
                uuid: request.param.id
            }
        });
        if(!attendance) return response.status(404).json({msg:"No attendance found"});
        await attendance.update({
                clockOut:Date.now
            },{
                where:{
                    [Op.and]:[{id: attendance.id}, {userId: request.userId}]
                }
        })
        response.status(200).json({msg:"Attendance update sucessfully"});
    } catch (error) {
        response.status(500).json({msg: error.message});
    }
}