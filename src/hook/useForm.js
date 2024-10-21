import { useState } from "react";

export const useForm = (initialForm = {} ) => {
    
    const [formValues, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formValues,
            [name]: value
        });
    }

    const resetForm = () => { 
        setFormState(initialForm);
    }

    return {
        ...formValues,
        formValues,
        onInputChange,
        resetForm 
    }
}