import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function CategoryCheckbox({ category, handleCheckboxChange, selectedCategories  }) {
    
    return (
        <FormControlLabel
            key={category.categoryId}
            control={
                <Checkbox
                    value={category.categoryId}
                    onChange={(event) => {
                        handleCheckboxChange(event, category.categoryId);
                    }}
                    checked={selectedCategories.includes(category.categoryId)}
                />
            }
            label={category.categoryName}
            sx={{ display: 'block', wordWrap: 'break-word' }}
        />
    );
}

export default CategoryCheckbox;