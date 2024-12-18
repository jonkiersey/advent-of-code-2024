import Step from "@components/step";
import { InputData } from "./types";
import { useState } from "react";
import { Typography } from "@mui/material";
import Worker from "worker-loader!./worker-part-two";

const PartTwo = ({ floorplan }: InputData) => {
  const [numberOfLoopPossibilities, setNumberOfLoopPossibilities] = useState<number | null>(null);
  const [hasFoundLoopPossibilities, setHasFoundLoopPossibilities] = useState(false);
  const [progress, setProgress] = useState<number>();

  const calculateLoopPossibilities = () => {
    setHasFoundLoopPossibilities(true);
    const worker = new Worker();
    worker.postMessage({ floorplan });
    worker.onmessage = (event) => {
      const { loopPossibilities, progress } = event.data;
      if (loopPossibilities !== undefined) {
        setNumberOfLoopPossibilities(loopPossibilities);
      }
      if (progress !== undefined) {
        setProgress(progress);
      }
    };
  };

  return (
    <>
      <Step
        buttonLabel="Find Loop Possibilities"
        buttonOnClick={calculateLoopPossibilities}
        buttonDisabled={hasFoundLoopPossibilities}
        progress={progress && numberOfLoopPossibilities !== null ? 100 : progress}
        shouldRender
      >
        {numberOfLoopPossibilities !== null && (
          <>
            <Typography>Number of Loop Possibilities: {numberOfLoopPossibilities}</Typography>
          </>
        )}
      </Step>
    </>
  );
};

export default PartTwo;
