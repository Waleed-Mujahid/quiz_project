
import classes from "./Overview.module.css";

interface OverviewProps {
  toggleHide: (hide: boolean) => void;
  setGotoNext: (gotoNext: boolean) => void;
}

export default function Overview(props: OverviewProps) {
  return (
    <>
      <div className={classes.blurBackground}></div>
      <div className={classes.container}>
        <div className={classes.heading} >Are you sure?</div>
        <div className={classes.text}>
          You have no answered all the questions of the knowledge section.
          Reuturning is no longer possible after this
        </div>
        <div>
          <button onClick = {() => {props.toggleHide(false)}} className={classes.cancel}>Cancel</button>
          <button onClick = {() => {props.toggleHide(false); props.setGotoNext(true)}}className={classes.ok} >Ok</button>
        </div>
      </div>
    </>
  );
}
