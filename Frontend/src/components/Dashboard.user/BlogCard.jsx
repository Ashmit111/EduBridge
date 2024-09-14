import React, { useState } from 'react';
import { FaUser, FaBlog, FaTimes } from 'react-icons/fa';

const blogs = [
  {
    id: 1,
    title: 'React Hooks Tutorial',
    description: 'Learn how to use React Hooks to manage state and side effects in your React applications.',
    username: 'John Doe',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'UI/UX Design Principles',
    description: 'Discover the fundamental principles of UI/UX design and how to apply them to your projects.',
    username: 'Jane Smith',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Full Stack Development with MERN',
    description: 'Learn how to build a full-stack application using the MERN stack (MongoDB, Express, React, Node.js).',
    username: 'Mike Johnson',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: 'Python for Data Science',
    description: 'Explore the world of data science with Python and learn how to apply it to real-world problems.',
    username: 'Emily Brown',
    image: 'https://via.placeholder.com/150',
  },
];

const BlogCard = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseBlog = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      {selectedBlog ? (
        <div className="bg-[#1a1f35] rounded-lg p-8 pt-8 pb-8 pl-8 relative">
          <button
            onClick={handleCloseBlog}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={24} />
          </button>
          <img src={selectedBlog.image} alt={selectedBlog.username} className="w-18 h-20 rounded-full mb-4" />
          <h3 className="text-2xl font-bold mb-4">{selectedBlog.title}</h3>
          <p className="text-lg font-semibold mb-2">{selectedBlog.description}</p>
          <p className="mb-2"><strong>Author:</strong> {selectedBlog.username}</p>
          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors">
            Learn More
          </button> */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 pb-8 pl-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#1a1f35] rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img src={blog.image} alt={blog.username} className="w-24 h-24 rounded-full mb-4" />
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="mb-4">{blog.description}</p>
              <p className="mb-2">{blog.username}</p>
              <button
                onClick={() => handleViewBlog(blog)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogCard;