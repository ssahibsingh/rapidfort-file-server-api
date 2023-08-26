"use client";
import { useRouter } from "next/navigation";
import { AiOutlineArrowRight } from "react-icons/ai";

export const metadata = {
  title: "File Info Server",
  description: "File Info Server",
};

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="container text-center">
        <h1 className="py-2">File Info Server</h1>
        <form id="upload-form text-center">
          <input type="file" name="file" />
          <button type="submit" className="submit-button">
            Upload
          </button>
        </form>
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
      </div>
    </>
  );
}
