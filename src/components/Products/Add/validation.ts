import * as Yup from 'yup';

export const CreateProductScheme = Yup.object().shape({
    name: Yup.string().min(1, "Name must be at least 1 characters").max(50, "Name must be at most 50 characters").required('Name is required'),
    detail: Yup.string().min(1, "Detail must be at least 1 characters").max(50, "Detail must be at most 50 characters").required('Detail is required'),

});