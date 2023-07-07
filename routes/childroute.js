const { request, response } = require("express");
const express=require("express");
const { checkAdmin } = require("../MiddleWare/authmw");
const controller=require("./../Controllers/childController");
const router=express.Router();
router.route("/child")
      .all(checkAdmin)
      .get(controller.getchildren) 
      .post(controller.postchildren)
      .patch(controller.patchchildren)
      .delete(controller.deletechildren);

router.route("/child/:id")
      .get(controller.getchild) 
      
module.exports=router;