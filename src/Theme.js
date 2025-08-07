import { createTheme } from "@mui/material";

function gettheme(mode) {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#fff",
              paper: "#f5f5f5",
            },
            text: {
              primary: "#000",
            },
          }
        : {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#fff",
            },
          }),
    },
    typography: {
      fontFamily: "playpen",
    },
  });
}

export default gettheme;

// const theme = createTheme({
//   typography: {
//     fontFamily: "playpen",
//   },

//    palette: {
//     mode: 'dark',
//     background: {
//       default: '#1d0101',
//       paper: '#111',
//     },
//     text: {
//       primary: '#fff',
//     },
//     primary: {
//       main: '#1976d2',
//     },
//   },

// });
