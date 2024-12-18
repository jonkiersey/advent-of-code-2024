import { Box, Button, styled } from "@mui/material";
import ButtonsBox from "./buttons-box";
import CircularWithValueLabel from "./circular-progress-with-label";
import { useEffect, useState } from "react";

const LoaderContainer = styled(Box)({
  transition: "opacity 1s 2s",
});

type Props = {
  buttonOnClick: () => void;
  buttonLabel: string;
  buttonDisabled: boolean;
  progress?: number;
  shouldRender: boolean;
  children?: React.ReactNode;
};
const Step = ({ buttonOnClick, buttonLabel, buttonDisabled, progress, shouldRender, children }: Props) => {
  const [progressVisible, setProgressVisible] = useState(false);
  useEffect(() => {
    if (progress === undefined || progress === 100) {
      setProgressVisible(false);
    } else {
      setProgressVisible(true);
    }
  }, [progress]);

  if (!shouldRender) return null;

  return (
    <>
      <ButtonsBox>
        <Button variant="contained" color="primary" onClick={buttonOnClick} disabled={buttonDisabled}>
          {buttonLabel}
        </Button>
        {progress !== undefined && (
          <LoaderContainer sx={{ opacity: progressVisible ? 1 : 0 }}>
            <CircularWithValueLabel progress={progress} />
          </LoaderContainer>
        )}
      </ButtonsBox>
      {children}
    </>
  );
};

export default Step;
