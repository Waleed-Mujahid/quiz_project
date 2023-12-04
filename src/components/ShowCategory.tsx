import { ShowCategoryProps } from "./ShowScore";
import classes from "./ShowCategory.module.css";

export const ShowCategory = (props: ShowCategoryProps) => {
  const filledWidth = `${( (props.category.total - props.total) / props.category.total) * 100}%`;

  return (
    <div className={classes.container}>
      <div> {props.category.categoryName}</div>

      <div className={classes.bar}>
        <div
          style={{
            width: filledWidth,
          }}
          className={classes.filled}
        ></div>
      </div>
      <div>
        {props.category.total - props.total} / {props.category.total}
      </div>
    </div>
  );
};
