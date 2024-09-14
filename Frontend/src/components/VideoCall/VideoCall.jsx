import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";



 
//   const token = generateToken(appId, appSecret, userId);
//   console.log(token);

const VideoCall = () => {
  const {roomID} = useParams();
  console.log(roomID);

  const userId = Date.now().toString();
  //   const effectiveTimeInSeconds = 36000 ;
  const Meeting = async (element) => {
    // const appId // genrated from zegocloud
    // const serverSecret // genrated from zegocloud
    try {
      const appID = 1922861951;
      const serverSecret = "0799abbcf0c548580c7bf19d5ee9af3e";
      const token = await generateToken(appID,serverSecret,userId);
      console.log(token);
      

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        appID,
        token,
        roomID,
        userId,
        ""
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // to join the call / room
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div ref={Meeting} style={{ height: "100vh", width: "100vw" }}></div>
      <div>Return Home</div>
    </>
  );
};

export default VideoCall;
