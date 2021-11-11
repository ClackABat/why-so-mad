import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, IconButton, Typography } from "@mui/material";
import Results from "./Results";
import { useRecoilState } from "recoil";
import {
  getInTheNews,
  getOnThisDay,
  getRandomPageFromCategory,
  getRandomResult,
} from "./Services";
import { inTheNewsState, onThisDayState, resultsState } from "./State";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box } from "@mui/system";
import "./App.css";
import { ContactMailSharp } from "@mui/icons-material";
import { titles } from "./Titles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#040926",
    },
    secondary: {
      main: "#645244",
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
    h3: {
      fontFamily: ["Cardo", "sans-serif"].join(","),
    },
  },
});

const styles = {
  container: {
    textAlign: "center",
    position: { sm: "relative", lg: "fixed" },
    left: { sm: "0", lg: "50%" },
    top: { sm: "0", lg: "30%" },
    transform: { sm: "none", lg: "translate(-50%, -50%)" },
  },
} as const;

function App() {
  const [results, setResults] = useRecoilState(resultsState);
  const [inTheNews, setInTheNews] = useRecoilState(inTheNewsState);
  const [onThisDay, setOnThisDay] = useRecoilState(onThisDayState);

  React.useEffect(() => {
    getResults();
    // getInTheNews().then((results) => console.log(results));
  }, []);

  const refreshHandler = () => {
    getResults();
  };

  const getResults = () => {
    Promise.all([getRandomResult(), getInTheNews(), getOnThisDay()]).then(
      ([result, inTheNews, onThisDay]) => {
        setResults(result);
        setInTheNews(inTheNews);
        setOnThisDay(onThisDay);
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={styles.container}>
        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
          <IconButton size="large" onClick={refreshHandler}>
            <RefreshIcon />
          </IconButton>
        </Box>
        <Typography variant="h3">
          {titles[Math.floor(Math.random() * titles.length)]}
        </Typography>
        <Results />
      </Container>
    </ThemeProvider>
  );
}

export default App;
