import classes from "./SectionScore.module.css";

interface SectionScoreProps {
  errNum: number;
  total: number;
  maxErrors: number;
  index: number;
}

export default function SectionScore(props: SectionScoreProps) {
  const svg =
    props.errNum > props.maxErrors ? (
      <svg
        style={{ color: "white", backgroundColor: "red", borderRadius: "50%" }}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 16 16"
        width="25"
        height="25"
        fill="none"
        stroke="currentColor"
      >
        {" "}
        <path d="m10.25 5.75-4.5 4.5m0-4.5 4.5 4.5" fill="red"></path>{" "}
        <circle cx="8" cy="8" r="6.25"></circle>{" "}
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 512 512"
      >
        <title>ionicons-v5-e</title>
        <path
          d="M448,256C448,150,362,64,256,64S64,150,64,256s86,192,192,192S448,362,448,256Z"
          style={{
            fill: "none",
            stroke: "green",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <polyline
          points="352 176 217.6 336 160 272"
          style={{
            fill: "none",
            stroke: "green",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "32px",
          }}
        />
      </svg>
    );

  return (
    <div className={classes.box}>
      <div className={classes.sectionHeading} > Section: {props.index} </div>
      <div className={classes.container}>
        {svg}
        <div>
          {props.errNum}/{props.total} Errors
        </div>
      </div>
    </div>
  );
}
