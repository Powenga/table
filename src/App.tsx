import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Users from "./Components/Users/Users";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import { indigo } from "@mui/material/colors";

import "./App.css";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: "#d50000",
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Users />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
