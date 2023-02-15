import React, { useState, useCallback, Fragment } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getOrientation } from 'get-orientation/browser';
import { getCroppedImg, getRotatedImage } from '../../auxFunctions/canvasUtils';
import { styles } from './styles';
// import ImageSearch from 'components/common/ImageSearch';

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const EasyCrop = ({ classes, aspect = 4 / 3, setImageUrl, setOpen }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  //access to the function that sets the image on the page

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      //setCroppedImage(croppedImage);

      setImageUrl(croppedImage);
      setOpen(false);
      //handleSetImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation, setImageUrl, setOpen]);

  const fileTypes = ['image/png', 'image/jpeg'];

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }
      //validate the image type here
      if (fileTypes.includes(file.type)) {
        setUploadError('');
        setImageSrc(imageDataUrl);
      } else {
        setUploadError('wrong file format');
      }
    }
  };

  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>

          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <Typography variant='overline' classes={{ root: classes.sliderLabel }}>
                zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div className={classes.sliderContainer}>
              <Typography variant='overline' classes={{ root: classes.sliderLabel }}>
                Rotation
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby='Rotation'
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
            <Button
              onClick={showCroppedImage}
              variant='contained'
              color='primary'
              classes={{ root: classes.cropButton }}
            >
              select
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <Fragment>
          <input type='file' id='imageUpload' onChange={onFileChange} accept='image/*' />
          <label for='imageUpload'>upload a file</label>
          <span className='upload-error-message'>{uploadError}</span>
        </Fragment>
      )}
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default withStyles(styles)(EasyCrop);
