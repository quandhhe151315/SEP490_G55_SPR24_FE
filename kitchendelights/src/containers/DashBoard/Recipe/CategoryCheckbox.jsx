import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

function CategoryCheckbox({ category, handleCheckboxChange, selectedCategoriesRef  }) {
    const [checked, setChecked] = useState(selectedCategoriesRef.current.includes(category.categoryId));
    
    const handleChange = (event) => {
        setChecked(event.target.checked);
        handleCheckboxChange(event, category.categoryId);
    };
    return (
        <FormControlLabel
            key={category.categoryId}
            control={
                <Checkbox
                    value={category.categoryId}
                    onChange={handleChange}
                    checked={checked}
                    
                />
            }
            label={category.categoryName}
            sx={{ display: 'block', wordWrap: 'break-word'}}
        />
    );
}

export default CategoryCheckbox;