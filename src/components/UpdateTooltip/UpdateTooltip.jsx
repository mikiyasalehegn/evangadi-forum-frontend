import React, { useState } from "react";
import classes from "./UpdateTooltip.module.css";

function UpdateTooltip({ content, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={classes.tooltiop__container}
    >
      {children}

      {/* tooltip content */}
      <div className={`${classes.tooltip} ${isVisible ? classes.open : ""}`}>
        {content}
        {/* arrow indicator */}
        <div className={classes.arrow} />
      </div>
    </div>
  );
}

export default UpdateTooltip;
