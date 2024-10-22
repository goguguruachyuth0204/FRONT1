// src/FileUpload.js

import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileId, setFileId] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileIdChange = (event) => {
        setFileId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileId', fileId);

        try {
            const response = await axios.post('https://uploadbackend-jjow.onrender.com/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(`File uploaded successfully! File ID: ${response.data.fileId}`);
        } catch (error) {
            setMessage('Error uploading file: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc' }}>
            <h1 style={{ textAlign: 'center' }}>File Upload</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fileId">File ID:</label>
                    <input
                        type="text"
                        id="fileId"
                        value={fileId}
                        onChange={handleFileIdChange}
                        required
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label htmlFor="file">Choose file:</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        required
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Upload
                </button>
            </form>
            {message && <p style={{ textAlign: 'center', color: '#d9534f' }}>{message}</p>}
        </div>
    );
};

export default FileUpload;
