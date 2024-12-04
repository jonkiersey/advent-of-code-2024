import ButtonsBox from "@components/buttons-box";
import LongList from "@components/long-list";
import { Button, Typography } from "@mui/material";
import { useReducer, useState } from "react";

type Props = {
  listOne: number[];
  listTwo: number[];
};

const PartTwo = ({ listOne, listTwo }: Props) => {
  const [haveKeysBeenFound, setHaveKeysBeenFound] = useState(false);
  const [haveFrequenciesBeenCounted, setHaveFrequenciesBeenCounted] =
    useState(false);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [
    hasSimilarityScoreBeenCalculated,
    setHasSimilarityScoreBeenCalculated,
  ] = useState(false);

  const [frequencies, dispatch] = useReducer(
    (
      state: { [k: number]: number },
      action: { key: number; type: "INCREMENT" | "INITIALIZE" }
    ) => {
      if (action.type === "INITIALIZE") {
        if (state[action.key] === undefined) {
          return { ...state, [action.key]: 0 };
        }
      }
      if (action.type === "INCREMENT") {
        if (state[action.key] !== undefined) {
          return { ...state, [action.key]: state[action.key] + 1 };
        }
      }
      return state;
    },
    {}
  );
  const getLeftHandKeys = () => {
    for (const leftHandKey of listOne) {
      dispatch({ key: leftHandKey, type: "INITIALIZE" });
    }
    setHaveKeysBeenFound(true);
  };

  const countFrequencies = () => {
    for (const rightHandKey of listTwo) {
      dispatch({ key: rightHandKey, type: "INCREMENT" });
    }
    setHaveFrequenciesBeenCounted(true);
  };

  const calculateSimilarityScore = () => {
    let similarityScore = 0;
    for (const leftHandKey of listOne) {
      similarityScore += leftHandKey * frequencies[leftHandKey];
    }
    setSimilarityScore(similarityScore);
    setHasSimilarityScoreBeenCalculated(true);
  };

  return (
    <>
      {listOne.length > 0 && listTwo.length > 0 && (
        <ButtonsBox>
          <Button
            variant="contained"
            disabled={haveKeysBeenFound}
            onClick={getLeftHandKeys}
          >
            Get Left Hand Keys
          </Button>
        </ButtonsBox>
      )}
      {Object.keys(frequencies).length > 0 && (
        <>
          <LongList label="Left Hand Keys" list={Object.keys(frequencies)} />
          <ButtonsBox>
            <Button
              variant="contained"
              disabled={haveFrequenciesBeenCounted}
              onClick={countFrequencies}
            >
              Get Frequencies
            </Button>
          </ButtonsBox>
        </>
      )}
      {haveFrequenciesBeenCounted && (
        <>
          <LongList
            label="Frequencies"
            list={Object.entries(frequencies).filter(([, v]) => v > 0)}
            prettyPrint={([k, v]) => `${k}: ${v}`}
          />
          <ButtonsBox>
            <Button
              variant="contained"
              onClick={calculateSimilarityScore}
              disabled={hasSimilarityScoreBeenCalculated}
            >
              Calculate Similarity Score
            </Button>
          </ButtonsBox>
        </>
      )}
      {similarityScore !== null && (
        <Typography>Similarity Score: {similarityScore}</Typography>
      )}
    </>
  );
};

export default PartTwo;
