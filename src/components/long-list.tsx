import OverflowTypography from "./overflow-typography";

type Props<T> = {
  label: string;
  list: T[];
  prettyPrint?: (value: T) => string;
};
const LongList = <T,>({ label, list, prettyPrint }: Props<T>) => {
  return (
    <OverflowTypography>
      {label}:{" "}
      {(prettyPrint !== undefined ? list.map(prettyPrint) : list).join(", ")}
    </OverflowTypography>
  );
};

export default LongList;
