import { useState } from "react";
import { Box, Button, styled, Typography } from "@mui/material";

const PageContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16,
  maxWidth: "100%",
}));

const ButtonsBox = styled(Box)({
  display: "flex",
  gap: 8,
});

const Locations = styled(Typography)({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const DayOne = () => {
  const [listOne, setListOne] = useState<number[]>([]);
  const [listTwo, setListTwo] = useState<number[]>([]);
  const [loadingLists, setLoadingLists] = useState<boolean>(false);

  const [sortedListOne, setSortedListOne] = useState<number[]>([]);
  const [sortedListTwo, setSortedListTwo] = useState<number[]>([]);
  const [loadingSortedLists, setLoadingSortedLists] = useState<boolean>(false);

  const [distances, setDistances] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState<number | null>(null);
  const [loadingDistances, setLoadingDistances] = useState<boolean>(false);

  const reset = () => {
    setListOne([]);
    setListTwo([]);
    setSortedListOne([]);
    setSortedListTwo([]);
    setDistances([]);
    setTotalDistance(null);
  };

  const loadLists = async (which: "example" | "actual") => {
    setLoadingLists(true);
    reset();
    const response = await fetch(`/api/day-1?input=${which}`);
    const data = await response.json();
    setListOne(data.listOne);
    setListTwo(data.listTwo);
    setLoadingLists(false);
  };

  const sortLists = () => {
    setLoadingSortedLists(true);
    setSortedListOne(listOne.toSorted());
    setSortedListTwo(listTwo.toSorted());
    setLoadingSortedLists(false);
  };

  const calculateDistances = () => {
    setLoadingDistances(true);
    const distances: number[] = [];
    for (let i = 0; i < sortedListOne.length; i++) {
      const distance = Math.abs(sortedListOne[i] - sortedListTwo[i]);
      distances.push(distance);
    }
    setDistances(distances);
    setTotalDistance(distances.reduce((acc, curr) => acc + curr, 0));
    setLoadingDistances(false);
  };

  return (
    <PageContainer>
      <Typography variant="h4">Day One</Typography>
      <ButtonsBox>
        <Button
          variant="outlined"
          onClick={() => loadLists("example")}
          disabled={loadingLists}
        >
          Load Example Input
        </Button>
        <Button
          variant="contained"
          onClick={() => loadLists("actual")}
          disabled={loadingLists}
        >
          Load Actual Input
        </Button>
      </ButtonsBox>
      {listOne.length > 0 && listTwo.length > 0 && (
        <>
          <Locations>List One: {listOne.join(", ")}</Locations>
          <Locations>List Two: {listTwo.join(", ")}</Locations>
          <ButtonsBox>
            <Button
              variant="contained"
              onClick={sortLists}
              disabled={loadingSortedLists}
            >
              Sort Lists
            </Button>
          </ButtonsBox>
        </>
      )}
      {sortedListOne.length > 0 && sortedListTwo.length > 0 && (
        <>
          <Locations>List One: {sortedListOne.join(", ")}</Locations>
          <Locations>List Two: {sortedListTwo.join(", ")}</Locations>
          <ButtonsBox>
            <Button
              variant="contained"
              onClick={calculateDistances}
              disabled={loadingDistances}
            >
              Get Distances
            </Button>
          </ButtonsBox>
        </>
      )}
      {distances.length > 0 && (
        <>
          <Locations>Distances: {distances.join(", ")}</Locations>
          <Typography>Total Distance: {totalDistance}</Typography>
        </>
      )}
    </PageContainer>
  );
};

export default DayOne;
