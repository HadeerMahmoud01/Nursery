const { request, response } = require("express");
const express= require("express");
const controller=require("./../Controllers/teacherController");
const router=express.Router();
router.route("/teachers")
      .get(controller.getallteachers)
      .post(controller.postteachers)
      .patch(controller.patchteachers)
      .delete(controller.deleteteachers)
      
router.route("/teachers/:id")
      .get(controller.getteacher)



module.exports=router;