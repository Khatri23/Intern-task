import yup from "yup";

export const registrationValidate = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.number().required()
});

export const loginValidate = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required()
});

export const updateValidate = yup.object({
    name: yup.string().min(1).optional(),
    email: yup.string().email().optional()
});