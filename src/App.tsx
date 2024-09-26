import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Users from "./Components/Users/Users";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

export default App;
