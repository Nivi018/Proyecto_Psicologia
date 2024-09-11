import { useState } from "react";

export const useForm = (initialForm = {} ) => {
    
    const [formValues, setFormState] = useState(initialForm);

    const onInputChange = ({target}) => {
        const {name, value} = target;
        setFormState({
           ...formValues,
            [name]: value
        });
    }

    const onReseForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formValues,
        formValues,
        onInputChange,
        onReseForm
    }
}