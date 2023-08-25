import File from "../models/File.js"

const getinfo = async (req, res) => {
    try {
        const name = req.params.name

        // Getting file info from MongoDB
        const resInfo = await File.findOne({ filename: name })

        // No file found with that name
        if (!resInfo) {
            return res.json({
                success: false,
                message: "File not found"
            })
        }

        // If file found, sending file info back to client
        res.json({
            success: true,
            message: "File found",
            info: {
                filename: resInfo.filename,
                size: resInfo.size,
                contentType: resInfo.contentType
            }
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

export default getinfo