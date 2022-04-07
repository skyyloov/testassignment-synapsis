import { useState } from 'react';

// import Nav from '../components/Nav';
// import styles from '../styles/Home.module.css';

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !content) return setError('All fields are required');
    };

    return (
        <div>
            <div class="container">
                <form onSubmit={handlePost}>
                    {error ? (
                        <div>
                            <h3>{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div>
                            <h3>{message}</h3>
                        </div>
                    ) : null}
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="title"
                        />
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Post content"
                        />
                    </div>
                    <div>
                        <button type="submit">Add post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}