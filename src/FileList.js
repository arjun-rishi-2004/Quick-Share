import { useEffect, useState } from "react";
import { storage,ref } from "./firebase-config";
import { listAll, getDownloadURL } from "firebase/storage";

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
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.name}{" "}
            <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
