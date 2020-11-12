const {
    controllerAddUser,
    controllerGetUsers,
    controllerGetUsersById,
    controllerUpdateUser,
    controllerDeleteUser,
  } = require("./user.controller.js");
  
  const router = require("express").Router();
  
  router.post("/add", controllerAddUser);
  router.get("/get", controllerGetUsers);
  router.get("/get/:id", controllerGetUsersById);
  router.patch("/update", controllerUpdateUser);
  router.delete("/delete", controllerDeleteUser)
  
  module.exports = router;

  