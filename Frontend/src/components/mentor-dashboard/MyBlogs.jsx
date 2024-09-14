import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const mentorId = auth.currentUser?.uid;

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            const blogsQuery = query(collection(db, 'blogPosts'), where('userId', '==', mentorId));
            const querySnapshot = await getDocs(blogsQuery);
            const blogsData = querySnapshot.docs.map(doc => doc.data());
            setBlogs(blogsData);
            setLoading(false);
        };

        fetchBlogs();
    }, [mentorId]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Blogs</h2>
            {loading ? <p>Loading blogs...</p> : (
                blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
                            <h3 className="text-xl font-bold">{blog.title}</h3>
                            <p>{blog.content.substring(0, 100)}...</p>
                        </div>
                    ))
                ) : <p>No blogs found</p>
            )}
        </div>
    );
};

export default MyBlogs;