import { useState } from "react";
import ButtonsBox from "./buttons-box";
import { LoadingButton } from "@mui/lab";

type Props = {
  buttonOnClick: () => void;
  buttonLabel: string;
  buttonDisabled?: boolean;
  loading?: boolean;
  shouldRender: boolean;
  children?: React.ReactNode;
};
const Step = ({ buttonOnClick, buttonLabel, buttonDisabled, loading, shouldRender, children }: Props) => {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const onClick = () => {
    setHasBeenClicked(true);
    buttonOnClick();
  };

  if (!shouldRender) return null;

  return (
    <>
      <ButtonsBox>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={onClick}
          loading={loading}
          disabled={buttonDisabled || hasBeenClicked}
        >
          {buttonLabel}
        </LoadingButton>
      </ButtonsBox>
      {children}
    </>
  );
};

export default Step;
