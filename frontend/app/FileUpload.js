"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const FileUpload = () => {
    const router = useRouter();
    const [status, setStatus] = useState(null);

    const handleFileUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
                formData
            );
            console.log("File uploaded:", response.data); // You can handle the response as needed

            if (response.data.success === true) {
                setStatus("File uploaded successfully")
            }
            else {
                setStatus(response.data.message)
            }

            // Reset the input value
            e.target[0].value = "";
        } catch (error) {
            console.error("Upload error:", error);
            setStatus("Something went wrong!!")
        }
    };
    return (
        <>
            <form id="upload-form text-center" onSubmit={handleFileUpload}>
                <input type="file" name="file" />
                <button type="submit" className="submit-button">
                    Upload
                </button>
            </form>
            {status && <p className="pt-2">{status}</p>}
            <hr />
            <div className="pt-2">
                <button
                    className="submit-button"
                    onClick={() => router.push("/file-archive")}
                >
                    File Archive <AiOutlineArrowRight />
                </button>
                <span className="sub">
                    Get Info and Download Previously Uploaded file
                </span>
            </div>
        </>
    )
}

export default FileUpload