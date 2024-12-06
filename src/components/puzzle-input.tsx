import { TextField } from "@mui/material";

type Props = {
  handleInputChange: (value: string) => void;
};
const PuzzleInput = ({ handleInputChange }: Props) => {
  return (
    <TextField
      label="Puzzle Input"
      multiline
      maxRows={4}
      onInput={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value)}
    />
  );
};

export default PuzzleInput;
