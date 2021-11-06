import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, IconButton, Typography } from "@mui/material";
import Results from "./Results";
import { useRecoilState } from "recoil";
import { getRandomResult } from "./Services";
import { resultsState } from "./State";
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: "#444",
    },
    secondary: {
      main: "#ED1C24",
    },
  },
  typography: {
    fontFamily: ["Raleway", "sans-serif"].join(","),
    h1: {
      fontFamily: ["Cardo", "sans-serif"].join(","),
      fontSize: "5rem",
    },
    h2: {
      fontFamily: ["Cardo", "sans-serif"].join(","),
    },
  },
});

function App() {
  const [results, setResults] = useRecoilState(resultsState);

  React.useEffect(() => {
    getResults();
  }, []);

  const refreshHandler = () => {
    getResults();
  };

  const getResults = () => {
    Promise.all([getRandomResult()]).then(([result]) => {
      setResults(result);
    });
  };

  return (
    
      <ThemeProvider theme={theme}>
        <Container sx={{textAlign: "center"}}>
          <Box sx={{ position: "absolute", top: 0, right: 0}}>
            <IconButton size="large" onClick={refreshHandler}><RefreshIcon/></IconButton>
          </Box>
          <Typography variant="h1">Why is my girlfriend mad at me?</Typography>
          <Results />
        </Container>
      </ThemeProvider>
  );
}

export default App;
