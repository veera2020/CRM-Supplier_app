/*
 *  Document    : Layout.js
 *  Author      : Uyarchi
 *  Description : Layout for Admin
 */
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = ({ children }) => {
  let history = useNavigate();
  return (
    <>
      <div className="">
        {/* <main className="">
          <div className="">
            <Navbar path={router.route} />
          </div>
          <div className="flex-grow scrollbar-hide">{children}</div>
        </main> */}
        {history.pathname !== "/" && history.pathname !== "/Register" ? (
          <>
            <main className="">
              <div className="">
                <Navbar path={history.route} />
              </div>
              <div className="flex-grow scrollbar-hide">{children}</div>
            </main>
          </>
        ) : (
          <main>
            <div className="flex-grow scrollbar-hide">{children}</div>
          </main>
        )}
      </div>
    </>
  );
};
export default Layout;
