import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = auth.currentUser; 
            if (!user) {
                setError('You need to be logged in to create a blog post.');
                return;
            }

            let imageUrl = null;

            if (image) {
                const imageRef = ref(storage, `blogImages/${uuidv4()}-${image.name}`);
                const snapshot = await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const postId = uuidv4();

            await addDoc(collection(db, 'blogPosts'), {
                userId: user.uid,
                title,
                content,
                imageUrl,
                postId,
                createdAt: new Date()
            });

            navigate('/mentor-dashboard'); 
        } catch (error) {
            console.error('Error creating blog post:', error);
            setError('An error occurred while creating the blog post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-100 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-green-800 text-center mb-6">Create Blog Post</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
                        <textarea
                            id="content"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="5"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image (Optional)</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-800 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Posting...' : 'Post Blog'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;