import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const VideoCallRoom = () => {
    const { roomID } = useParams();
    const jitsiContainer = useRef(null);

    useEffect(() => {
        if (!jitsiContainer.current) return;

        const options = {
            roomName: roomID,
            width: '100%',
            height: '100%',
            parentNode: jitsiContainer.current,
            configOverwrite: {
            },
            interfaceConfigOverwrite: {
            },
        };

        const api = new window.JitsiMeetExternalAPI('meet.jit.si', options);

        return () => {
            api.dispose();
        };
    }, [roomID]);

    return (
        <div style={{ height: "100vh", width: "100vw" }} ref={jitsiContainer}></div>
    );
};

export default VideoCallRoom;