'use client';
import axios from 'axios';
import React, { useState } from 'react'

const FileArchive = () => {
    const [fileInfo, setFileInfo] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [status, setStatus] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/file/${searchInput}`,
            );

            console.log("File info:", response.data); // You can handle the response as needed


            if (response.data.success === true) {
                setFileInfo(response.data.info);
                setStatus(response.data.message)
            }
            else {
                setFileInfo(null);
                setStatus(response.data.message)
            }

        } catch (error) {
            console.error("Error fetching file info:", error);
            setStatus("Something went wrong while fetching file info")
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/download/${searchInput}`,
                {
                    responseType: "blob", // Important for downloading files
                }
            );
            // Create a URL for the blob and initiate download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", searchInput);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error);
            setStatus("Something went wrong while downloading file")
        }
    };
    return (
        <>
            <input
                type="text"
                id="search-input"
                placeholder="Search a file"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <br />
            <button
                id="search-button"
                className="submit-button mt-2"
                onClick={handleSearch}
            >
                Search
            </button>
            {status && <p className="pt-2">{status}</p>}
            {fileInfo && (
                <>
                    <div>
                        <hr />
                        <h3>File Info</h3>
                        <div>
                            <p>
                                <span>Name: </span>
                                <span>{fileInfo.filename}</span>{" "}
                            </p>
                            <p>
                                <span>Size: </span>
                                <span>{fileInfo.size}</span>{" "}
                            </p>
                            <p>
                                <span>Type: </span>
                                <span>{fileInfo.contentType}</span>{" "}
                            </p>
                        </div>
                    </div>
                    <button className="submit-button mt-2" onClick={handleDownload}>
                        Download
                    </button>
                </>
            )}
        </>
    )
}

export default FileArchive