import { TextField } from "@mui/material";

type Props = {
  handleInputChange: (value: string) => void;
};
const PuzzleInput = ({ handleInputChange }: Props) => {
  return (
    <TextField
      label="Puzzle Input"
      placeholder="Paste puzzle input here"
      multiline
      maxRows={4}
      onChange={(event) => handleInputChange(event.target.value)}
    />
  );
};

export default PuzzleInput;
