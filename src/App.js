import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import Dashboard from "./components/Dashboard";
import EncryptedMessage from "./components/EncryptedMessage";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";

const AppContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  justifyContent: 'space-between',
});

const MainContent = styled(Box)({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  maxHeight: 'calc(100vh - 120px)',
  overflow: 'auto',
});

function App() {
  return (
    <AppContainer>
      <Router>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route
              path="/messages/:uniqueId"
              element={<EncryptedMessage />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </MainContent>
        <Footer />
      </Router>
    </AppContainer>
  );
}

export default App;
