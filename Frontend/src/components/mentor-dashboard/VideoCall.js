import { useNavigate } from "react-router-dom";

const VideoCall = ({ roomID }) => {
    const navigate = useNavigate();

    const handleJoinClick = () => {
        navigate(`/videocallroom/${roomID}`);
    };

    return (
        <div>
            <button onClick={handleJoinClick} style={{ marginTop: '20px', padding: '10px 20px' }}>
                Join
            </button>
        </div>
    );
};

export default VideoCall;