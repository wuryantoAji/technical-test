import Users from "../models/UserModel.js";

export const verifyUser = async (request, response, next) => {
    if(!request.session.userId){
        return response.status(401).json({msg:"Please login to your account"});
    }
    const dbResponse = await Users.findOne({
        where: {
            uuid: request.session.userId,
        }
    });
    if(!dbResponse) return response.status(404).json({msg:"User cannot be found"});
    request.userId = dbResponse.id;
    request.role = dbResponse.role;
    next();
}

export const adminOnly = async (request, response, next) => {
    const dbResponse = await Users.findOne({
        where: {
            uuid: request.session.userId,
        }
    });
    if(!dbResponse) return response.status(404).json({msg:"User cannot be found"});
    if(dbResponse.role !== "HRD") return response.status(403).json({msg:"Endpoint not authorized"});
    next();
}