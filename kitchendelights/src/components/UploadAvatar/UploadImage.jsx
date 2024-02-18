import React, { useState } from 'react';

function UploadImage() {
  const [dragOver, setDragOver] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setErrorMessage('');
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage('Vui lòng chọn một tập tin ảnh');
    }
  };

  return (
    <div className={`drop-area ${dragOver ? 'dragover' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="drop-text">Kéo và thả ảnh vào đây</p>
      {imageSrc && <img src={imageSrc} alt="Uploaded" />}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <style jsx>{`
  .drop-area {
    position: relative;
    width: 370px;
    height: 270px;
    border: 3px dotted #ff5e00;
    border-radius: 10px;
    text-align: center;
    margin: 50px auto;
  }

  .dragover {
    border-color: #ff5e00;
  }

  .drop-text {
    font-size: 18px;
    color: #666;
    margin-top: 100px;
    position: relative;
    z-index: 1;
  }

  .error {
    color: red;
  }

  img {
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
`}</style>

    </div>
  );
}

export default UploadImage;
