import React, { useState } from 'react';
import { storage, db } from '../../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UploadPDF = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const fileRef = ref(storage, `notes/${file.name}`);
            await uploadBytes(fileRef, file);
            const fileURL = await getDownloadURL(fileRef);

            // Store file URL in Firestore
            const docRef = doc(db, 'notes', file.name);
            await setDoc(docRef, {
                fileName: file.name,
                fileURL
            });

            navigate(`/view-pdf/${file.name}`); // Redirect to the PDF viewer
        } catch (err) {
            setError('Error uploading file: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-purple flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-bold text-dark-purple text-center mb-6">Upload PDF</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleUpload}>
                    <div className="mb-4">
                        <label htmlFor="file" className="block text-gray-700 font-bold mb-2">Select PDF File</label>
                        <input
                            type="file"
                            id="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadPDF;
