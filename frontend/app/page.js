
import FileUpload from "./FileUpload.js";

export const metadata = {
  title: 'File Info Server',
  description: 'Upload, Get Info and download files',
}

export default function Home() {
  return (
    <>
      <div className="container text-center">
        <h1 className="py-2">File Info Server</h1>
        <FileUpload />
      </div>
    </>
  );
}
