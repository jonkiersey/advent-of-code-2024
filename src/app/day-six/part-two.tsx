import Step from "@components/step";
import { InputData } from "./types";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

const PartTwo = ({ floorplan }: InputData) => {
  const [numberOfLoopPossibilities, setNumberOfLoopPossibilities] = useState<number | null>(null);

  const { isPending, mutate: findLoopPossibilities } = useMutation({
    mutationFn: () => fetch("/api/day-six/part-two", { method: "POST", body: JSON.stringify({ floorplan }) }),
    onSuccess: async (res) => {
      const { count } = await res.json();
      setNumberOfLoopPossibilities(count);
    },
  });

  return (
    <Step buttonLabel="Find Loop Possibilities" buttonOnClick={findLoopPossibilities} loading={isPending} shouldRender>
      {numberOfLoopPossibilities !== null && (
        <>
          <Typography>Number of Loop Possibilities: {numberOfLoopPossibilities}</Typography>
        </>
      )}
    </Step>
  );
};

export default PartTwo;
