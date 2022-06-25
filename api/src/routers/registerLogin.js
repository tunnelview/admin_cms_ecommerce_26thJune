import express, { Router } from "express";
import { hashPassword } from "../helpers/bcryptHelper.js";
import { adminRegistrationValidation } from "../middlewares/validationMiddleware.js";
import { crateNewAdmin } from "../models/adminUser/AdminUserModel.js";
const route = express.Router();
import { v4 as uuidv4 } from "uuid";

route.post("/", adminRegistrationValidation, async (req, res, next) => {
  try {
    //1. encrypt password
    req.body.password = hashPassword(req.body.password);

    const verificationCode = uuidv4();
    req.body.verificationCode = verificationCode;
    //2. call model to run save query
    const result = await crateNewAdmin(req.body);

    if (result?._id) {
      console.log(result);
      //3. unique url endpoint and sent that to customer.

      return res.json({
        status: "success",
        message:
          "We have sent you an email, please check email and follow the instruction to activate your account.",
      });
    }

    res.json({
      status: "error",
      message: "Unable to craete an user, please try again later.",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message =
        "There is already a register user with this email, pelase login with this email or use different emal.";
    }
    next(error);
  }
});

export default route;
