import { useState, useEffect } from 'react';
import { supabase, BUCKET } from './supabase-config';
import Button from '@mui/joy/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from './SearchBar';

function FileList() {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      const { data } = await supabase.storage.from(BUCKET).list();
      if (!data) return;
      const fileUrls = data.map((item) => ({
        name: item.name,
        downloadUrl: supabase.storage.from(BUCKET).getPublicUrl(item.name).data.publicUrl,
      }));
      setFiles(fileUrls);
    };

    fetchFiles();
  }, []);

  const deleteFile = async (fileName) => {
    await supabase.storage.from(BUCKET).remove([fileName]);
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <div >
      <h2>Uploaded Files</h2>
<SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      {files
        .filter((file) =>
          file.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((file) => (
          <Card 
          sx={{
            minWidth: 345, 
            padding: 1, 
            marginTop: 3, 
            float: 'left', 
            width: '90%', // Set the width to 90% for mobile
            margin: '0 auto', // Center the card horizontally
            marginBottom: '20px' // Add some bottom margin for spacing
          }}
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
