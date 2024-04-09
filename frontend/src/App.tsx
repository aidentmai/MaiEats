import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/UseAuth";

function App() {
  const handleGetStartedClick = () => {
    // Handle logic for when the "Get Started Now" button is clicked
  };
  return (
    <>
      <UserProvider>
        <Navbar />
        <Hero onGetStartedClick={handleGetStartedClick} />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
