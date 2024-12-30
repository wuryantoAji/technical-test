import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUser = async (request, response) => {
    try {
        const dbResponse = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'gender', 'role']
        });
        response.status(200).json(dbResponse);
    } catch (error) {
        response.status(500).json({msg:error.message});
    }
}

export const getUserByID = async (request, response) => {
    try {
        const dbResponse = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'gender', 'role'],
            where: {
                uuid: request.params.id
            }
        });
        response.status(200).json(dbResponse);
    } catch (error) {
        response.status(500).json({msg:error.message});
    }
}

export const createUser = async (request, response) => {
    const { name, email, password, confPassword, gender, role } = request.body;
    if (password !== confPassword) return response.status(400).json({msg: "Password does not match"});
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            gender: gender,
            role: role,
            createdAt: Date.now()
        });
        response.status(201).json({msg: "Registration Success"});
    }catch(error){
        response.status(400).json({msg: error.message});
    }
}

export const updateUser = async (request, response) => {
    try {
        const dbResponse = await Users.findOne({
            where: {
                uuid: request.params.id
            }
        });

        if(!dbResponse) return response.status(404).json({msg:"User cannot be found"});

        const { name, email, password, confPassword } = request.body;
        
        let hashPassword;
        
        if( password === "" || password === null ){
            hashPassword = dbResponse.password;
        } else {
            hashPassword = await argon2.hash(password);
        }
        
        if (password !== confPassword) return response.status(400).json({msg: "Password does not match"});
        
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
        },{
            where:{
                id: dbResponse.id 
            }
        });

        response.status(200).json({msg: "User updated"});

    } catch (error) {

        response.status(500).json({msg:error.message});

    }
}