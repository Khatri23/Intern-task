import yup from "yup";

export const roleValidate = yup.object({
    role: yup.string().trim().required()
});

export const idValidate = yup.object({
    id: yup.number().integer().positive().required()
});
