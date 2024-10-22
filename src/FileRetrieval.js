// src/FileRetrieval.js

import React, { useState } from 'react';
import axios from 'axios';

const FileRetrieval = () => {
    const [fileId, setFileId] = useState('');
    const [message, setMessage] = useState('');

    const handleFileIdChange = (event) => {
        setFileId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`https://uploadbackend-jjow.onrender.com/files/download/${fileId}`, {
                responseType: 'blob', // Important to handle binary data
            });

            // Create a blob URL and set it for download
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileId); // Use fileId as the download filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setMessage('File downloaded successfully!');
        } catch (error) {
            setMessage('Error retrieving file: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc' }}>
            <h1 style={{ textAlign: 'center' }}>Retrieve File</h1>
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
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Retrieve
                </button>
            </form>
            {message && <p style={{ textAlign: 'center', color: '#d9534f' }}>{message}</p>}
        </div>
    );
};

export default FileRetrieval;
