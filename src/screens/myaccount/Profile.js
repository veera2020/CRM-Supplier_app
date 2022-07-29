/*
 *  Document    : Home.js
 *  Author      : Uyarchi
 *  Description : View User Details
 */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
//components
import Header from "../../components/Layout/Header";
import axios from "../../axios";
//function init
const Profile = (props) => {
  //useState
  const [user, setuser] = useState("");
  const [reload, setreload] = useState(false);
  //router
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/v1/supplier/${Cookies.get("UserId")}`)
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
    <Header/>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex justify-center">
            Profile Details
          </h1>
        </div>
      </header>
      <div className="px-3 py-6">
        <div className="border border-graycolor cursor-pointer">
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
              Secret Name
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.secretName}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
              Trade Name
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.tradeName}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
              Company Type
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.companytype}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
              Primary Contact Name
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.primaryContactName}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
              Primary Contact Number
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.primaryContactNumber}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
              Secondary Contact Name
            </div>
            {user.secondaryContactName === "" ? (
              <div className="col-span-3 p-1 flex justify-center">null</div>
            ) : (
              <div className="col-span-3 p-1 flex justify-center">
                {user.secondaryContactName}
              </div>
            )}
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
              Secondary Contact No
            </div>
            {user.secondaryContactNumber === "" ? (
              <div className="col-span-3 p-1 flex justify-center">null</div>
            ) : (
              <div className="col-span-3 p-1 flex justify-center">
                {user.secondaryContactNumber}
              </div>
            )}
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1 ">
              Email
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.email}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1 ">
              GST No
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.gstNo}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1 ">
              Address
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.RegisteredAddress}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1 ">
              Country
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.countries}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1 ">
              State
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.state}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1 ">
              District
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.district}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1 ">
              Pincode
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.pinCode}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
              Location
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.gpsLocat}
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 border-t border-graycolor">
            <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1 ">
              Products Dealing With
            </div>
            <div className="col-span-3 p-1 flex justify-center">
              {user.productDealingWith}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
