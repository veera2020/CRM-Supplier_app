/*
 *  Document    : App.js
 *  Author      : ticvic
 *  Description : root file for index
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import NotFound from "./screens/NotFound/404";
import Register from "./screens/register/Register";
import Home from "./screens/home/Home";
import Forgotpassword from "./screens/forgotpassword/Forgotpassword";
import ChangePassword from "./screens/myaccount/ChangePassword";
import Profile from "./screens/myaccount/Profile";
import Postrequirement from "./screens/requirements/Postrequirement";
import Requirement from "./screens/requirements/Requirement";
import Upcominglive from "./screens/takelive/Upcominglive";
import Rejected from "./screens/takelive/Rejected";
import Takelive from "./screens/takelive/Takelive";
import LivewithID from "./screens/takelive/LivewithID";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpassword" element={<Forgotpassword />} />
        <Route path="home" element={<Home />} />
        <Route path="myaccount/profile" element={<Profile />} />
        <Route path="myaccount/changepassword" element={<ChangePassword />} />
        <Route path="requirement/post" element={<Postrequirement />} />
        <Route path="requirement/myrequirement" element={<Requirement />} />
        {/* <Route path="takelive/upcominglive" element={<Upcominglive />} /> */}
        <Route path="takelive/rejected" element={<Rejected />} />
        <Route path="takelive/takelive" element={<Takelive />} />
        <Route path="takelive/takelive/newPath/:id" element={<LivewithID />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
