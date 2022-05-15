import {useState, useRef, useEffect} from 'react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import imagePreview from './ImagePreview'

function ImageEditor(props) {
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState()
  const previewCanvasRef = useRef()
  const imgRef = useRef()

  const MINUTE_MS = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      imagePreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop
      )
    }, MINUTE_MS);

    return () => clearInterval(interval);
  })

  function download(e) {
    var element = document.createElement('a')
    var data = previewCanvasRef.current.toDataURL();
    element.href = data
    element.download='book_canvas.png'
    element.click()
    element.remove()
  }

  return (
    <div>
      <ReactCrop crop={crop} onChange={c => setCrop(c)} maxWidth={100} maxHeight={100} onComplete={(c) => setCompletedCrop(c)}>
        <img src={props.src} ref={imgRef} alt=''/>
      </ReactCrop>
      {
        completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
              display: 'none'
            }}
          />
        )
      }
      <button onClick={(e) => download(e)}>DOWNLOAD</button>
    </div>
  )
}

export default ImageEditor;
