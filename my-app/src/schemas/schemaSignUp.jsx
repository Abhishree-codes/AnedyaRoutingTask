import * as Yup from "yup";

export const signUpSchema = Yup.object({
    firstName: Yup
      .string()
      .required("First name is required")
      .min(3, "First name should be at least 3 characters")
      .max(15)
      ,
    lastName: Yup
      .string()
      .required("Last name is required")
      .min(3, "Last name should be at least 3 characters")
      .max(15)
      ,
    email: Yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .max(20, "Password should not exceed 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    confirm: Yup
      .string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required")
  });