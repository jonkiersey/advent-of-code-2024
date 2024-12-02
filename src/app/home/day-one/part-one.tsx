import { useState } from "react";
import { Button, Typography } from "@mui/material";
import ButtonsBox from "@components/buttons-box";
import LongList from "@components/long-list";

type Props = {
  listOne: number[];
  listTwo: number[];
};

const PartOne = ({ listOne, listTwo }: Props) => {
  const [sortedListOne, setSortedListOne] = useState<number[]>([]);
  const [sortedListTwo, setSortedListTwo] = useState<number[]>([]);
  const [loadingSortedLists, setLoadingSortedLists] = useState(false);
  const [haveListsBeenSorted, setHaveListsBeenSorted] = useState(false);

  const [distances, setDistances] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState<number | null>(null);
  const [loadingDistances, setLoadingDistances] = useState(false);
  const [haveDistancesBeenCalculated, setHaveDistancesBeenCalculated] =
    useState(false);

  const sortLists = () => {
    setLoadingSortedLists(true);
    setSortedListOne(listOne.toSorted());
    setSortedListTwo(listTwo.toSorted());
    setLoadingSortedLists(false);
    setHaveListsBeenSorted(true);
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
    setHaveDistancesBeenCalculated(true);
  };

  return (
    <>
      {listOne.length > 0 && listTwo.length > 0 && (
        <ButtonsBox>
          <Button
            variant="contained"
            onClick={sortLists}
            disabled={loadingSortedLists || haveListsBeenSorted}
          >
            Sort Lists
          </Button>
        </ButtonsBox>
      )}
      {sortedListOne.length > 0 && sortedListTwo.length > 0 && (
        <>
          <LongList label="List One" list={sortedListOne} />
          <LongList label="List Two" list={sortedListTwo} />
          <ButtonsBox>
            <Button
              variant="contained"
              onClick={calculateDistances}
              disabled={loadingDistances || haveDistancesBeenCalculated}
            >
              Get Distances
            </Button>
          </ButtonsBox>
        </>
      )}
      {distances.length > 0 && (
        <>
          <LongList label="Distances" list={distances} />
          <Typography>Total Distance: {totalDistance}</Typography>
        </>
      )}
    </>
  );
};

export default PartOne;
