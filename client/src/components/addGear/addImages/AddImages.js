import { Paper, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ProgressList from './progressList/ProgressList';
import ImagesList from './ImagesList';

const AddImages = () => {
    const [files, setFiles] = useState([]);
    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, 
        accept: 'image/*'
    });

    return (
        <div style={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Paper
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #ccc',
                    borderRadius: 4,
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease',
                    '&:hover': {
                        borderColor: '#999',
                    },
                }}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Typography variant="h6" color="primary">
                        Drop files here
                    </Typography>
                ) : (
                    <Typography variant="h6">
                        Drag and drop files or click to upload
                    </Typography>
                )}
                <Typography variant="body2" color="textSecondary" mt={1}>
                    -(Images with .jpeg, .png, .jpg formats will be accepted)
                </Typography>
            </Paper>
            <ProgressList files={files} />
            <ImagesList />
        </div>
    );
};

export default AddImages;
