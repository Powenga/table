import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { Users } from "../widgets/users";
import { useSocket } from "../widgets/users/model/useSocket";

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
  const { socket } = useSocket();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

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
