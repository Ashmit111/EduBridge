import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
// import CryptoJS from 'crypto-js';

// function generateToken(appId, appSecret, userId, expireTime = 360000) {
//   const payload = {
//     app_id: appId,
//     user_id: userId,
//     expire_time: expireTime
//   };

//   const payloadJson = JSON.stringify(payload);
//   const payloadBytes = CryptoJS.enc.Utf8.parse(payloadJson);

//   const signature = CryptoJS.HmacSHA256(payloadBytes, appSecret);
//   const signatureBase64 = signature.toString(CryptoJS.enc.Base64);

//   const token = `${payloadJson}.${signatureBase64}`;
//   return token;
// }
import { enc } from 'crypto-js';

var ErrorCode; // Define enum for error codes
(function (ErrorCode) {
    ErrorCode[ErrorCode["success"] = 0] = "success";
    ErrorCode[ErrorCode["appIDInvalid"] = 1] = "appIDInvalid";
    ErrorCode[ErrorCode["userIDInvalid"] = 3] = "userIDInvalid";
    ErrorCode[ErrorCode["secretInvalid"] = 5] = "secretInvalid";
    ErrorCode[ErrorCode["effectiveTimeInSecondsInvalid"] = 6] = "effectiveTimeInSecondsInvalid";
})(ErrorCode || (ErrorCode = {}));
function RndNum(a, b) { // Function to return random number within given range
    return Math.ceil((a + (b - a)) * Math.random());
}
// Function to generate random 16 character string
function makeRandomIv() {
    var str = '0123456789abcdefghijklmnopqrstuvwxyz';
    var result = [];
    for (var i = 0; i < 16; i++) {
        var r = Math.floor(Math.random() * str.length);
        result.push(str.charAt(r));
    }
    return result.join('');
}
// Function to determine algorithm based on length of secret key (16, 24 or 32 bytes)


// AES encryption function using CBC/PKCS5Padding mode
function aesEncrypt(plainText, key, iv) {
  const cipher = enc.AES.encrypt(plainText, key, {
    iv: iv,
    mode: enc.mode.CBC,
    padding: enc.pad.Pkcs7,
  });
  return cipher.ciphertext.toString(enc.Base64);
}

// Function to generate token using given parameters
function generateToken04(appId, userId, secret, effectiveTimeInSeconds, payload) {
  if (!appId || typeof appId !== 'number') { // Check if appID is valid
    throw {
        errorCode: ErrorCode.appIDInvalid,
        errorMessage: 'appID invalid'
    };
}
if (!userId || typeof userId !== 'string') { // Check if userId is valid
    throw {
        errorCode: ErrorCode.userIDInvalid,
        errorMessage: 'userId invalid'
    };
}
if (!secret || typeof secret !== 'string' || secret.length !== 32) { // Check if secret is valid
    throw {
        errorCode: ErrorCode.secretInvalid,
        errorMessage: 'secret must be a 32 byte string'
    };
}
if (!effectiveTimeInSeconds || typeof effectiveTimeInSeconds !== 'number') { // Check if effectiveTimeInSeconds is valid
    throw {
        errorCode: ErrorCode.effectiveTimeInSecondsInvalid,
        errorMessage: 'effectiveTimeInSeconds invalid'
    };
}
var createTime = Math.floor(new Date().getTime() / 1000); // Get current time in seconds
var tokenInfo = { // Create object with token information
    app_id: appId,
    user_id: userId,
    nonce: RndNum(-2147483648, 2147483647),
    ctime: createTime,
    expire: createTime + effectiveTimeInSeconds,
    payload: payload || ''
};

  var plaintText = JSON.stringify(tokenInfo); // Convert tokenInfo object to JSON string
  console.log('plain text: ', plaintText);
  var iv = makeRandomIv(); // Generate random 16 character string for iv
  console.log('iv', iv);
  var encryptBuf = aesEncrypt(plaintText, secret, iv); // Encrypt JSON string using AES encryption function
  var expireBytes = new Uint8Array(8);
  var expireDataView = new DataView(expireBytes.buffer);
  expireDataView.setBigInt64(0, BigInt(tokenInfo.expire), false); // Set expire time in binary format

  var ivLengthBytes = new Uint8Array(2);
  var ivLengthDataView = new DataView(ivLengthBytes.buffer);
  ivLengthDataView.setUint16(0, iv.length, false); // Set length of iv in binary format

  var encryptedLengthBytes = new Uint8Array(2);
  var encryptedLengthDataView = new DataView(encryptedLengthBytes.buffer);
  encryptedLengthDataView.setUint16(0, encryptBuf.length, false); // Set length of encrypted information in binary format

  var buf = new Uint8Array(
    expireBytes.byteLength +
    ivLengthBytes.byteLength +
    iv.length +
    encryptedLengthBytes.byteLength +
    encryptBuf.length
  );
  var offset = 0;
  buf.set(expireBytes, offset);
  offset += expireBytes.byteLength;
  buf.set(ivLengthBytes, offset);
  offset += ivLengthBytes.byteLength;
  buf.set(enc.enc.Utf8.parse(iv), offset);
  offset += iv.length;
  buf.set(encryptedLengthBytes, offset);
  offset += encryptedLengthBytes.byteLength;
  buf.set(enc.enc.Base64.parse(encryptBuf), offset);

  return '04' + enc.enc.Base64.stringify(buf); // Return final token string in Base64 format
}


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
      const token = generateToken04(appID,userId,serverSecret,3600,"");
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
