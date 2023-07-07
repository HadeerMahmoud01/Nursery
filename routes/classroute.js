const { request, response } = require("express");
const express= require("express");
const controller=require("./../Controllers/classController");
const router=express.Router();
router.route("/classes")
      .get(controller.getclasses)
      .post(controller.postclasses)
      .patch(controller.patchclasses)
      .delete(controller.deleteclasses);


router.route("/classes/:id")
      .get(controller.getclass)

module.exports=router;