import React, { useEffect, useRef } from "react";
import { load } from "handtrackjs";

const HandTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const btnLoadingRef = useRef(null);
  let lmodel;

  useEffect(() => {
    const startVideo = async () => {
      const video = videoRef.current;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
        setInterval(runDetection, 10);
      } catch (error) {
        console.error(error);
      }
    };

    const runDetection = () => {
      lmodel.detect(videoRef.current).then((predictions) => {
        console.log(predictions);
        lmodel.renderPredictions(
          predictions,
          canvasRef.current,
          canvasRef.current.getContext("2d"),
          videoRef.current
        );
      });
    };

    const modelParams = {
      flipHorizontal: true,
      imageScaleFactor: 0.7,
      maxNumBoxes: 20,
      iouThreshold: 0.5,
      scoreThreshold: 0.79,
    };

    load(modelParams).then((model) => {
      lmodel = model;
      btnLoadingRef.current.style.display = "none";
      startVideo();
    });
  }, []);

  return (
    <div>
      <div>
        <input
          type="button"
          id="btn_loading"
          value="모듈 로드중..."
          ref={btnLoadingRef}
        />
      </div>
      <canvas id="canvas" width="400" height="400" ref={canvasRef}></canvas>
      <video
        id="video"
        autoPlay
        width="400"
        height="400"
        ref={videoRef}
      ></video>
    </div>
  );
};

export default HandTracking;
