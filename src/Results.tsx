import { Link, Typography } from '@mui/material';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { inTheNewsState, resultsState } from './State';

type Props = {
    
};

const Results: React.FC<Props> = (props) => {
    const [results, setResults] = useRecoilState(resultsState);
    const [inTheNews, setInTheNews] = useRecoilState(inTheNewsState);

    return <>
        <Typography>{inTheNews}</Typography>
        {results.map((result, index) => (
            <div key={index}>
                <Link href={ `http://en.wikipedia.org/?curid=${result.id}`} target="_blank"><h2>{result.title}</h2></Link>
            </div>
        ))}
    </>;
};

export default Results;