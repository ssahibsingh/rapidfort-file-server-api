import { BlockBlobClient } from "@azure/storage-blob";
import File from "../models/File.js";

const fetchFile = async (req, res) => {
    try {
        const filename = req.params.name; // Assuming the filename is provided as a URL parameter

        // Checking if the file exists in MongoDB
        const fileInfo = await File.findOne({ filename });
        if (!fileInfo) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }

        // Create a BlockBlobClient for the specified blob
        const blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING, 'uploads', filename);

        // Download the blob data as a readable stream
        const blobResponse = await blobService.download(0); // Start downloading from the beginning
        const blobStream = blobResponse.readableStreamBody;

        // Set the appropriate headers for the response
        res.set({
            'Content-Type': fileInfo.contentType,
            'Content-Disposition': `attachment; filename="${fileInfo.filename}"`
        });

        // Pipe the blob stream to the response
        blobStream.pipe(res);
    }
    catch (error) {
        // Sending error response back to client
        console.log('error: ', error);
        res.status(500).json({
            success: false,
            message: "File fetch failed",
            error: error.message
        });
    }
}

export default fetchFile;
