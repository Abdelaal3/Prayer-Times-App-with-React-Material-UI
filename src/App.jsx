import { useState, useMemo, useEffect } from "react";

import "./App.css";
import MainContent from "./Components/MainContent";

import gettheme from "./Theme";

// MUI //
import Container from "@mui/material/Container";
import { ThemeProvider, CssBaseline, Button } from "@mui/material";
// ===  MUI === //

function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("MUI-Mode") || "dark";
  });

  const theme = useMemo(() => gettheme(mode), [mode]);

  const toggelBtn = () => {
    setMode((prevmode) => (prevmode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const saveMode = localStorage.getItem("MUI-Mode");
    if (saveMode) {
      setMode(saveMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("MUI-Mode", mode);
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="Home">
          <Container maxWidth="lg">
            <div style={{ display: "flex", justifyContent: "end" , paddingTop:'20px', overflow: 'hidden',}}>
              <Button variant="outlined" onClick={toggelBtn}>
                {mode === "dark" ? "light" : "dark"}
              </Button>
            </div>
            <MainContent />
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
