const {z} = require("zod")

const signupSchema = z.object({
    fullname: z
    .string({ required_error: "username is required" })
    .trim()
    .min(3, { message: "name must be at least 3 characters" })
    .max(255, { message: "username must not be more than 255 characters" }),
  
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .min(3, { message: "name must be at least 3 characters" })
    .max(255, { message: "email must not be more than 255 characters" }),
  
  ph_no: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: "phone must be at least 10 characters" })
    .max(10, { message: "phone must not be more than 10 characters" }),

  password: z
    .string({ required_error: "password is required" })
    
    .min(5, { message: "password must be at least 5 characters" })
    .max(255, { message: "password must not be more than 255 characters" }),
});

module.exports = signupSchema;