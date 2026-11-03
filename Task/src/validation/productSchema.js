import yup from "yup";
export const productValidate = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    stock: yup.number().required(),
    category: yup.number().required()
});

export const idValidate = yup.object({id: yup.number().required()});

export const updateValidate = yup.object({
    price: yup.number().optional(),
    stock: yup.number().optional(),
    category: yup.number().optional()
});