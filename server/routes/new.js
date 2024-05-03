const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function pinFileToIPFS(filePath) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const axiosConfig = {
        headers: {
            ...formData.getHeaders(),
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzZTIxODNkOS04OGM0LTQwMTYtYTVmNS01Y2RjNTdjY2M1MDUiLCJlbWFpbCI6InZlbG9jaXR5c3RyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhMGZmMDEzM2Q4NGNhMTE2OGQyZSIsInNjb3BlZEtleVNlY3JldCI6IjY2ZmNiMTAwODk0OWI1NGFmZmI2ZTZkODBjYWZlNDhiYTIyODMxMTA0YzY3NzU2ZjZiZmZjNWJmZGJmYzM5MDYiLCJpYXQiOjE3MTQ1ODAxNDR9.LtJPOHkRH21XiHqcA5oTzSLFoUVEtnKtB5blJnpUGjA` // Using JWT for authentication
        }
    };

    try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, axiosConfig);
        console.log('File uploaded:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading file to Pinata:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Usage example
pinFileToIPFS('../s.pdf').then(data => {
    console.log(`Uploaded file CID: ${data.IpfsHash}`);
    console.log(`Access your file via IPFS gateway: https://ipfs.io/ipfs/${data.IpfsHash}`);
}).catch(error => {
    console.error('Upload failed:', error);
});
