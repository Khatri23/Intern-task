import yup from "yup";

export const checkId = yup.object({
    id: yup.number().required().min(1)
});