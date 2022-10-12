import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RentalApi from "../api/api";

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
 
  const { property_id } = useParams();
  const BASE_URL = RentalApi.getBaseURL();


  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      let url = `${BASE_URL}/upload/${property_id}`;
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0)
    }
  };

  return (
    <div className="container">
      <h6 className="mt-4">Property Added. Upload a file(optional)</h6>
      <div className="mb-4">Otherwise will render default file for your property</div>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
          
        </div>

        <Progress className="mb-2" percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
        <div className="mt-2"></div>
      </form>
     
      {uploadedFile ? (
        <div className='row'>
        </div>
      ) : null}
      <hr></hr>
      <Link to='/'>
      <button type="button" className="btn btn-primary btn-block mt-4">Go To Listings</button>
      </Link>
    </div>
  );
};

export default FileUpload;
