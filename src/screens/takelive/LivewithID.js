import Livestreaming from "./Livestreaming";
import { Route, Link, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Header from "../../components/Layout/Header";

const LivewithID = () => {
  const [data, setdata] = useState("");
  const params = useParams();

  console.log(params);
  useEffect(() => {
    axios.get(`/v1/liveStream/${params.id}`).then((res) => {
      console.log(res.data);
      setdata(res.data);
    });
  }, []);

  return (
    <>
      <Header />

      <div className="p-4">
        <div className="border border-gray-800 mt-5 rounded-md ">
          <div className="grid grid-cols-2">
            <div className="col-span-1 border-r border-gray-800 p-2">
              <div className="font-semibold text-sm">Live Chatting</div>
            </div>
            <div className="col-span-1 border-r border-gray-800 p-2">
              <div className="font-semibold text-sm">
                <Livestreaming data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LivewithID;
