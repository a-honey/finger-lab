import React, { useEffect, useRef } from "react";

const Webcam = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = videoRef.current;
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error("웹캠 액세스 에러:", error);
      });
  }, []);

  return <video ref={videoRef} autoPlay playsInline id="webcam" />;
};

export default Webcam;
