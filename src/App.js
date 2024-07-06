import "./pages/App.css";
import Home from "./pages/Home";
import SignUp from "./pages/Sign_Up";
import SignIn from "./pages/Sign_In";
import ForgetPassword from "./pages/ForgetPassword";
import OtpCode from "./pages/OtpCode";

function App() {
  return (
    <div className="App">
      <Home />
      <SignUp />
      <SignIn />
      <ForgetPassword />
      <OtpCode />
    </div>
  );
}

export default App;
