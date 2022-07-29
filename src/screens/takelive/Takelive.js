import { useState, useEffect } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import { Badge } from "antd";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Livestreaming from "./Livestreaming";
import axios from "../../axios";

const Takelive = () => {
  const [data, setdata] = useState("");
  const [id, setid] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const a = Cookies.get("UserId");
    axios.get(`/v1/liveStream/getAll/token/approved/${a}`).then((res) => {
      console.log(res.data);
      setdata(res.data);
    });
  }, []);
  const routeChange = (props) => {
    let path = `newPath/${props}`;
    navigate(path);
  };
  const golive = (props) => {
    const data = {
      streaming: "Online",
    };
    axios.put(`/v1/liveStream/${props}`, data).then((res) => {
      routeChange(props);
      console.log(res.data);
    });
  };
  return (
    <>
      <Header />
      <div className="grid grid-cols-5 p-4 gap-4">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="col-span-1 h-24 bg-gray-500 rounded-lg flex flex-col justify-center items-center"
              onClick={() => {
                golive(item._id);
              }}
            >
              <span className="">
                {item.product} - {item.expectedQnty}Kg
              </span>
              <div className="">{item.liveStreamDate}</div>
              <div className="">{item.liveStreamTime}</div>
            </div>
          ))}
      </div>
      {/* <div className="p-4">
        <div className="border border-gray-800 mt-5 rounded-md ">
          <div className="grid grid-cols-2">
            <div className="col-span-1 border-r border-gray-800 p-2">
              <div className="font-semibold text-sm">Live Chatting</div>
            </div>
            <div className="col-span-1 border-r border-gray-800 p-2">
              <div className="font-semibold text-sm">
                <Livestreaming data={id} />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Takelive;
