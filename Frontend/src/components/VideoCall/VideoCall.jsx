import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import CryptoJS from 'crypto-js';

function generateToken(appId, appSecret, userId, expireTime = 3600) {
  const payload = {
    app_id: appId,
    user_id: userId,
    expire_time: Math.floor(Date.now() / 1000) + expireTime
  };

  const payloadJson = JSON.stringify(payload);
  const payloadBytes = CryptoJS.enc.Utf8.parse(payloadJson);

  const signature = CryptoJS.HmacSHA256(payloadBytes, appSecret);
  const signatureBase64 = signature.toString(CryptoJS.enc.Base64);

  const token = `${payloadJson}.${signatureBase64}`;
  return token;
}
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
      const token = generateToken(appID,serverSecret,userId);
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
