import { BlockBlobClient } from "@azure/storage-blob";
import getStream from "into-stream";
import File from "../models/File.js";

const formatFileSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

const uploadFile = async (req, res) => {
    try {
        const file = req.files.file
        const blobName = file.name // blob name stored in Azure Storage

        // Checking if file already exists in MongoDB
        const response = await File.findOne({ filename: blobName })
        if (response) {
            return res.json({
                success: false,
                message: "File already exists with same name"
            })
        }

        const blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING, 'uploads', blobName) // creating blob service 
            , stream = getStream(file.data) // converting file buffer to stream
            , streamLength = file.data.length // getting file length

        await blobService.uploadStream(stream, streamLength) // uploading file to Azure Storage

        // File Info to be stored in MongoDB
        const metadata = {
            filename: blobName,
            size: formatFileSize(file.size),
            contentType: file.mimetype
        }

        // Adding file info to MongoDB
        await File.create(metadata)

        // Sending response back to client
        res.json({
            success: true,
            message: "File uploaded successfully",
        })
    }
    catch (error) {
        // Sending error response back to client
        console.log('error: ', error)
        res.json({
            success: false,
            message: "File upload failed",
            error: error.message
        })
    }
}

export default uploadFile