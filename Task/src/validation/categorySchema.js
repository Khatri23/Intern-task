import yup from "yup";

export const categoryValidate = yup.object({
    name:yup.string().required
});

export const idValidate = yup.object({id:yup.number().validate()});