import "./css/App.css";
import Board from "./components/Board";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <Board />
      </SnackbarProvider>
    </div>
  );
}

export default App;
