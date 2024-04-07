import React from "react";
import { useGetAllCategory } from "../../hook/useGetAllCategory";
import TooltipItem from "./ToolTipItem";
import { useGetCategoryByParentId } from "../../hook/useGetCategoryByParentId";

export default function CategoryHoverItem() {
  const { categoryByParentId } = useGetCategoryByParentId({categoryType:true});
  return (
    <>
      {categoryByParentId?.map((item) => {
        return <TooltipItem categoryItem={item} key={item?.categoryId}/>;
      })}
    </>
  );
}
