import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Users from "./Components/Users/Users";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Users />
    </QueryClientProvider>
  );
}

export default App;
