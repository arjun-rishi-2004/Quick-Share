import { useEffect, useState } from "react";
import { storage,ref } from "./firebase-config";
import { listAll, getDownloadURL } from "firebase/storage";
import Button from '@mui/joy/Button';
import Card from '@mui/material/Card';

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const storageRef = ref(storage, "uploaded_files");
      const filesList = await listAll(storageRef);
      const fileUrls = await Promise.all(
        filesList.items.map(async (item) => ({
          name: item.name,
          downloadUrl: await getDownloadURL(item),
        }))
      );
      setFiles(fileUrls);
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Uploaded Files</h2>
      



        {files.map((file) => (
                <Card sx={{ maxWidth: 345,padding:1,marginTop:1 ,float:"left"}} key={file.name}>
            {file.name}{" "}
            {/* <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer">
              Download
            </a> */}

            <Button variant="outlined" component="a" href="#as-link"  href={file.downloadUrl} target="_blank" rel="noopener noreferrer">
            Download</Button>

            </Card>
        ))}
    </div>
  );
}

export default FileList;
