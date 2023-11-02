import React, { useState, useEffect } from 'react';
import { storage, ref } from './firebase-config';
import { listAll, getDownloadURL } from 'firebase/storage';
import Button from '@mui/joy/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteObject } from 'firebase/storage';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';

function FileList() {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      const storageRef = ref(storage, 'uploaded_files');
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

  const deleteFile = async (fileName) => {
    const storageRef = ref(storage, `uploaded_files/${fileName}`);
    await deleteObject(storageRef);
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
   
      <TextField type="text"
        placeholder="Search files..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value) }id="outlined-search" label="Search files" />


      {files
        .filter((file) =>
          file.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((file) => (
          <Card
            sx={{ maxWidth: 345, padding: 1, marginTop: 1, float: 'left' }}
            key={file.name}
          >
            {file.name}{' '}
            <CardActions>
              <Button
                variant="outlined"
                component="a"
                href={file.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </Button>

              <Button
                onClick={() => deleteFile(file.name)}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
}

export default FileList;
