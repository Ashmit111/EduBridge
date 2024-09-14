import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase-config'; // Make sure this is where you import your Firebase config

const storage = getStorage(app); // Initialize Firebase Storage


const uploadProfilePicture = async (file) => {
    // Create a reference to the file in Firebase Storage
    const fileRef = ref(`storage, profile_pictures/${file.name}`);
    
    try {
        // Upload the file to Firebase Storage
        await uploadBytes(fileRef, file);
        
        // Get the download URL of the uploaded file
        const url = await getDownloadURL(fileRef);
        
        return url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Failed to upload file');
    }
};

export { uploadProfilePicture };