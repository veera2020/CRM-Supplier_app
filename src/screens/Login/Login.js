/*
 *  Document    : index.js
 *  Author      : Uyarchi
 *  Description : Index Page
 */
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Loginvalidation from "./LoginValidation";
import Buttons from "../../components/controls/Buttons";
export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 flex justify-center">
              Supplier Login
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto  py-6 sm:px-6 lg:px-8">
            {/* <!-- Replace with your content --> */}
            <div className="px-4 py-6 h-auto sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg ">
                <div className="px-5 items-center">
                  <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1">Login</Menu.Item>
                    <Menu.Item key="2">
                      <Link to="/register">Sign up</Link>
                    </Menu.Item>
                  </Menu>
                </div>
                <div className="py-4">
                  <Loginvalidation />
                </div>
                <div className="flex justify-center">
                  <Buttons
                    className="text-primary"
                    variant="link"
                    size="xs"
                    onClick={() => navigate("/forgotpassword")}
                  >
                    Forgot Password
                  </Buttons>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
