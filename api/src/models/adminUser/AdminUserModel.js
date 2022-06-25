import AdminSchema from "./AdminUserSchema.js";

export const crateNewAdmin = (obj) => {
  return AdminSchema(obj).save();
};
