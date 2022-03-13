import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import { client } from "./util/apolloClient";
import { AuthProvider } from "./util/auth";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedPageExample from "./pages/ProtectedPageExample";
import SignUp from "./pages/SignUp";
import Reservations from "./pages/Reservations";
import 'bootstrap/dist/css/bootstrap.min.css';
import QueueJumpLogo from "../src/components/QueueJumpLogo.png";

function App() {
  return (
    <div>
    <img src={QueueJumpLogo} alt={"The logo"} className="col-4" />
    {/* <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Use <RequiredAuth> for pages that should only be accessible to a
            user that has logged in.*/}
            {/* <Route
              path="/protected"
              element={
                <RequireAuth>
                  <ProtectedPageExample />
                </RequireAuth> */}
              {/* }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ApolloProvider> */}
    <Favorites />
    </div>
  );
}

export default App;
