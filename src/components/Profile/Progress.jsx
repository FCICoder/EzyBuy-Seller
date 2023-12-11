// import React from "react";
import { ProgressBar } from "primereact/progressbar";
import Card from "../UI/Card";
import classes from "./Progress.module.css";
const Progress = () => {
  return (
    <Card>
      <div className={classes.tasks}>
        <h1 className={classes.title} style={{ fontSize: "1.5rem" }}>
          Tasks Progress
        </h1>

        <div className={classes.task}>
          <div className={classes.details}>
            <h2>
              Finishing Marketing Plan
            </h2>
            <p className={classes.detail}>Managing the Budget</p>
          </div>

          <ProgressBar value={50} />
        </div>
        <div className={classes.task}>
          <div className={classes.details}>
            <h2 >
              Finishing Marketing Plan
            </h2>
            <p className={classes.detail}>Managing the Budget</p>
          </div>

          <ProgressBar value={20} />
        </div>
        <div className={classes.task}>
          <div className={classes.details}>
            <h2 >
              Finishing Marketing Plan
            </h2>
            <p className={classes.detail}>Managing the Budget</p>
          </div>

          <ProgressBar value={70} />
        </div>
        <div className={classes.task}>
          <div className={classes.details}>
            <h2 >
              Finishing Marketing Plan
            </h2>
            <p className={classes.detail}>Managing the Budget</p>
          </div>

          <ProgressBar value={60} />
        </div>
        <div className={classes.task}>
          <div className={classes.details}>
            <h2 >
              Finishing Marketing Plan
            </h2>
            <p className={classes.detail}>Managing the Budget</p>
          </div>

          <ProgressBar value={90} />
        </div>
     
       
      </div>
    </Card>
  );
};

export default Progress;
