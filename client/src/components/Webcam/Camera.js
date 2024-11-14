import React, {useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  height: 150,
  // width: 1920,
  facingMode: "environment"
};

const WebcamCapture = () => {
    const [deviceId, setDeviceId] = React.useState({});
    const [devices, setDevices] = React.useState([]);
  
    const handleDevices = React.useCallback(
      mediaDevices =>
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
      [setDevices]
    );
  
    React.useEffect(
      () => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
      },
      [handleDevices]
    );
  
    return (
      <>
        {devices.map((device, key) => (
            <div>
              <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} />
              {device.label || `Device ${key + 1}`}
            </div>
  
          ))}
      </>
    );
};

const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
    {/* <WebcamCapture /> */}
      <Webcam
        ref={webcamRef}
        // audio={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        screenshotQuality={1}
      />
       <button onClick={capturePhoto}>Capture</button>
      <button onClick={() => setUrl(null)}>Refresh</button>
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )} 
    </>
  );
};

export default Camera;