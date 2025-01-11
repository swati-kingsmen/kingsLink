import * as yup from 'yup';

export const userSchema = yup.object({
    firstName: yup
        .string()
        .required("First Name is required"),
    
    lastName: yup
        .string()
        .optional(),

    phoneNumber: yup
        .number()
        .typeError("Invalid Phone Number")
        .min(1000000000, 'Phone Number is invalid')
        .max(999999999999, 'Phone Number is invalid')
        .required('Phone Number is required'),

    username: yup
        .string()
        .email("Email must be a valid email")
        .required("Email is required"),

    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Password is required")
        .when('userAction', {
            is: 'add',  // Only validate password for add action (add user)
            then: yup.string().required("Password is required"),
        }),

    assignedManager: yup
        .string()
        // .required("Assigned Manager is required")
        .matches(/^[a-zA-Z0-9-_]+$/, "Assigned Manager can only contain letters, numbers, hyphens, and underscores")
        .optional()
        ,

designation: yup
        .string()
        .oneOf(['manager', 'rm'], 'Invalid Designation')
        .required("Designation is required"),

// assignedManager: yup
//     .string()
//     .when("designation", {
//       is: "rm", // Apply validation when designation is "rm"
//       then: yup
//         .string()
//         .required("Assigned Manager is required")
//         .matches(
//           /^[a-zA-Z0-9-_]+$/,
//           "Assigned Manager can only contain letters, numbers, hyphens, and underscores"
//         ),
//       otherwise: yup.string().notRequired(),
//     }),

    assignedEmployees: yup
        .array()
        .of(yup.string())
        .optional()  // Optional field, used when designation is 'rm'
});
