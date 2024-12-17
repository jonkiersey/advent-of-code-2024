import { Button } from "@mui/material";
import ButtonsBox from "./buttons-box";

type Props = {
  buttonOnClick: () => void;
  buttonLabel: string;
  buttonDisabled: boolean;
  shouldRender: boolean;
  // shouldRenderChildren?: boolean;
  children?: React.ReactNode;
};
// const Step = ({ buttonOnClick, buttonLabel, buttonDisabled, shouldRender, shouldRenderChildren, children }: Props) => {
const Step = ({ buttonOnClick, buttonLabel, buttonDisabled, shouldRender, children }: Props) => {
  if (!shouldRender) return null;

  return (
    <>
      <ButtonsBox>
        <Button variant="contained" color="primary" onClick={buttonOnClick} disabled={buttonDisabled}>
          {buttonLabel}
        </Button>
      </ButtonsBox>
      {children}
    </>
  );
};

export default Step;
