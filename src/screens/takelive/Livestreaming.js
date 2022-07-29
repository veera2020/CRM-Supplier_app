import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import Cookies from "js-cookie";
function LiveVideoStreaming(props) {
  console.log(props);
  const delay = 1;
  const navigate = useNavigate();
  const [token, settoken] = useState("");
  const [enable, setenable] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finishStatus, setfinishStatus] = useState(false);

  // useEffect(() => {
  //   axios.get(`/v1/liveStream/${props}`).then(res=>console.log(res.data))
  // });
  var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {},
  };
  // Options for joining a channel
  var option = {
    appID: "50c7493877764c85aa44d921a68f2b38",
    channel: props.data.requirementID,
    uid: null,
    token: props.data.token,
    //  "00650c7493877764c85aa44d921a68f2b38IABH+SIBMZ1vCtpfcHHCk/A8FYBUNPL2EYj/+fd9/O0LE68sD1MAAAAAEAAtDEjTmKnfYgEAAQCYqd9i",
    //token.token,
    // "00650c7493877764c85aa44d921a68f2b38IACOu5+uZsBJV5vQtTw556WepnvExfTId3w9AXX4q9we2q8sD1MAAAAAEAB3F92FN1rNYgEA6AMAAAAA",
    //token:"00650c7493877764c85aa44d921a68f2b38IAAd8hpywu6GjjGcsvG5kK8qrjpJcl/SihYa73uxwCPE8a8sD1MAAAAAEACQKMvtd0DNYgEAAQB2QM1i",
    // key: "897667d6840942eca11d94551acabec6",
    //secret: "8e7ecd7603534f2f9df5cd3da0b0cbd5",
  };
  function joinChannel(role) {
    setLoading(true);
    // Create a client
    rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    // Initialize the client
    rtc.client.init(
      option.appID,
      function () {
        console.log("init success");
        // Join a channel
        rtc.client.join(
          option.token ? option.token : null,
          option.channel,
          option.uid ? +option.uid : null,
          function (uid) {
            console.log(
              "join channel: " + option.channel + " success, uid: " + uid
            );
            rtc.params.uid = uid;
            if (role === "host") {
              setenable(true);
              rtc.client.setClientRole("host");
              // Create a local stream
              rtc.localStream = AgoraRTC.createStream({
                streamID: rtc.params.uid,
                audio: true,
                video: true,
                screen: false,
              });
              // Initialize the local stream
              rtc.localStream.init(
                function () {
                  console.log("init local stream success");
                  rtc.localStream.play("local_stream");
                  rtc.client.publish(rtc.localStream, function (err) {
                    console.log("publish failed");
                    console.error(err);
                  });
                },
                function (err) {
                  console.error("init local stream failed ", err);
                }
              );
              rtc.client.on("connection-state-change", function (evt) {
                console.log("audience", evt);
              });
            }
            if (role === "audience") {
              rtc.client.on("connection-state-change", function (evt) {
                console.log("audience", evt);
              });
              rtc.client.on("stream-added", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                if (id !== rtc.params.uid) {
                  rtc.client.subscribe(remoteStream, function (err) {
                    console.log("stream subscribe failed", err);
                  });
                }
                console.log("stream-added remote-uid: ", id);
              });
              rtc.client.on("stream-removed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                console.log("stream-removed remote-uid: ", id);
              });
              rtc.client.on("stream-subscribed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                remoteStream.play("remote_video_");
                console.log("stream-subscribed remote-uid: ", id);
              });
              rtc.client.on("stream-unsubscribed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                remoteStream.pause("remote_video_");
                console.log("stream-unsubscribed remote-uid: ", id);
              });
            }
          },
          function (err) {
            console.error("client join failed", err);
            console.log("hema");
          }
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }
  function leaveEventHost(params) {
    rtc.client.unpublish(rtc.localStream, function (err) {
      console.log("publish failed");
      console.error(err);
    });
    rtc.client.leave(function (ev) {
      console.log(ev);
    });
  }
  function leaveEventAudience(params) {
    rtc.client.leave(
      function () {
        console.log("client leaves channel");
        navigate("/TakeLive/takelive");
        //……
      },
      function (err) {
        console.log("client leave failed ", err);
        //error handling
      }
    );
  }
  //reload the page
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to go back ?")) {
        setfinishStatus(true);
        leaveEventAudience("audience");
        // leaveEventHost("host");
        // your logic
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false);
      }
    }
  };

  const goback = () => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  };

  return (
    <div>
      <Button
        size="xs"
        colorScheme="teal"
        onClick={() => {
          joinChannel("host");
          goback();
        }}
        disabled={loading}
      >
        Join Channel as Host
      </Button>
      <div
        id="local_stream"
        className="local_stream"
        style={{ width: "auto", height: "200px" }}
      ></div>
      {enable && (
        <Button
          colorScheme="red"
          onClick={() => {
            //leaveEventAudience("audience");
            navigate("/TakeLive/takelive");
          }}
        >
          Leave
        </Button>
      )}
    </div>
  );
}
export default LiveVideoStreaming;
