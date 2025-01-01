import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (request, response) => {
    const dbResponse = await Users.findOne({
        where: {
            email: request.body.email,
        }
    });
    if(!dbResponse) return response.status(404).json({msg:"User cannot be found"});

    const match = await argon2.verify(dbResponse.password, request.body.password);
    if(!match) return response.status(400).json({msg:"Wrong password"});

    request.session.userId = dbResponse.uuid;
    const uuid = dbResponse.uuid;
    const name = dbResponse.name;
    const email = dbResponse.email;
    const gender = dbResponse.gender;
    const role = dbResponse.role;
    response.status(200).json({uuid, name, email, gender, role});
};

export const Me = async (request, response) => {
    if(!request.session.userId){
        return response.status(401).json({msg:"Please login to your account"});
    }
    const dbResponse = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'gender', 'role'],
        where: {
            uuid: request.session.userId,
        }
    });
    if(!dbResponse) return response.status(404).json({msg:"User cannot be found"});
    response.status(200).json(dbResponse);
}

export const LogOut = (request, response) => {
    console.log("check here");
    request.session.destroy((error)=>{
        if(error) return response.status(400).json({msg:"Cannot logout"});
        response.status(200).json({msg:"You have logout"});
    });
}