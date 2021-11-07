import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useRecoilState } from "recoil";
import { inTheNewsState, onThisDayState, resultsState } from "./State";

type Props = {};

const Results: React.FC<Props> = (props) => {
  const [results, setResults] = useRecoilState(resultsState);
  const [inTheNews, setInTheNews] = useRecoilState(inTheNewsState);
  const [onThisDay] = useRecoilState(onThisDayState);

  return (
    <Box>
        {/* <Typography>Maybe because...</Typography> */}
      <Typography>{inTheNews}</Typography>
      <Typography>{onThisDay}</Typography>
      {results.map((result, index) => (
        <div key={index}>
          <Link
            href={`http://en.wikipedia.org/?curid=${result.id}`}
            target="_blank"
          >
            <Typography>{result.title}</Typography>
          </Link>
        </div>
      ))}
    </Box>
  );
};

export default Results;
