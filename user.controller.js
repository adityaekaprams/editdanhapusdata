const {
    serviceAddUser, 
    serviceGetUsers,
    serviceGetUsersById,
    serviceUpdateUser,
    serviceDeleteUser } = require("./user.service")
    
const { genSaltSync, hashSync, compareSync} = require("bcrypt");

module.exports = {
    controllerAddUser: (req, res)=>{
        const hasilInput = req.body;
        const salt = genSaltSync(10);
        hasilInput.password = hashSync(hasilInput.password, salt);
        serviceAddUser(hasilInput, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "failed add new user"
                })
            }
return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    controllerGetUsers: (req, res) => {
        serviceGetUsers((err, results)=>{
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success: 1,
                    data: results
                })
            }
        })
    },
    controllerGetUsersById: (req, res)=>{
        const id = req.params.id;
        serviceGetUsersById(id, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success:0,
                    message: "Record not found"
                })
            }else{
                return res.json({
                    succes: 1,
                    data: results
                })
            }
        })
    },
    controllerUpdateUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        serviceUpdateUser(body, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "update failed"
                })
            }
            else{
                return res.json({
                    success: 1,
                    message: "update succesfuly"
                })
            }
        })
    },
    controllerDeleteUser: (req, res) => {
        const body = req.body.id
        serviceDeleteUser(body, (err, results) => {
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            else{
                return res.json({
                    success: 1,
                    message: "User delete succesfuly",
                    del: results
                })
            }
        })
    }
}

