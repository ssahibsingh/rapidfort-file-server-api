import FileArchive from "./FileArchive";


export const metadata = {
  title: 'File Archive',
  description: 'Get info and download previously uploaded file',
}


const FileArchivePage = () => {

  return (
    <>
      <div className="container text-center">
        <h1>File Archive</h1>
        <FileArchive />
      </div>
    </>
  );
};

export default FileArchivePage;