"use client"
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsFolder } from "react-icons/bs";
import HashLoader from "react-spinners/HashLoader";

const baseStyle = {
    flex: 1,
    width: "100%",
    height: "30vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //   padding: "20px",
    borderWidth: "3px",
    borderRadius: "30px",
    //   borderColor: "#d2a52a8d",
    borderColor: "#777",
    borderStyle: "dashed",
    // backgroundColor: "#a2c1a593",
    // backgroundColor: "#cdf0d0",
    backgroundColor: "#6aba5e1e",
    color: "#000",
    outline: "none",
    transition: "border .24s ease-in-out",
};

const focusedStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00B895",
};

const rejectStyle = {
    borderColor: "#8b152d",
};

const Drag = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();
    const [show, setShow] = useState(true);

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        maxFiles: 1,
        onDrop: (acceptedFiles, fileRejectionItems) => {
            if (fileRejectionItems.length > 0) {
                setError(fileRejectionItems[0].errors[0].message);
            }
            if (acceptedFiles.length > 0) {
                setError(null);
                setResult(null);
                let cfile = acceptedFiles[0];
                cfile.preview = URL.createObjectURL(cfile);
                console.log(cfile);
                setFile(cfile);
            }
        },
    });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    const handleUpload = async () => {
        setLoading(true);
        setShow(false);

        let formData = new FormData();
        formData.append("image", file);
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        try {
            setFile(null);
            let response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}`,
                formData,
                config
            );
            console.log(response.data);
            if (response.data.success) {
                setResult(response.data);
                console.log(response.data.prediction);
                setFile(null);
                setError(null);

                getFact(response.data.prediction);
            } else {
                setError(response.data.message);
                setFile(null);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <>
            <div className="col-md-6 col-sm-12 col-12 text-center">
                {show && !file && (
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <div className={isDragActive ? "text-muted" : null}>
                            <div>
                                <BsFolder
                                    className={
                                        isDragActive ? "drop-icon text-muted" : "drop-icon"
                                    }
                                />
                                <p>
                                    Upload or Drag and <br></br>drop your image
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {file && file.preview && (
                    <div className="mt-3">
                        <div className="container">
                            <div className="row text-center justify-content-center">
                                <div className="image-preview">
                                    <div className="d-flex justify-content-around align-items-center">
                                        <div className="col-auto">
                                            <p className="">{file.name}</p>
                                        </div>
                                        <div className="row justify-content-around align-items-center">
                                            <div className="col-auto d-flex justify-content-around align-items-center gap-1">
                                                <button
                                                    onClick={() => {
                                                        setFile(null);
                                                        setShow(true);
                                                    }}
                                                    className="btn-danger p-0 px-2 pb-1 btn rounded-circle "
                                                >
                                                    x
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center align-items-center">
                                        <div className="mt-4">
                                            <button className="btn btn-main" onClick={handleUpload}>
                                                Predict
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-1">
                    <div className="row text-center justify-content-center">
                        {error ? (
                            <>
                                <div className="col-12">
                                    <p className="text-danger">{error}</p>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                {loading && (
                    <>
                        <div className="mt-3">
                            <div className="container">
                                <div className="row text-center justify-content-center">
                                    <div className="image-preview">
                                        <HashLoader className="mx-auto" color="#6aba5e" />
                                        <p>Predicting.... Please Wait</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Drag;