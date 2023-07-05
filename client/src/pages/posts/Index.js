import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, updatePost } from "../../services/postService";

function Index({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getAllPosts();
      setPosts(data);
    }
    loadData();
  }, []);

  const handleCompletionToggle = async (postId) => {
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex((post) => post._id === postId);

    if (postIndex !== -1) {
      const updatedPost = {
        ...updatedPosts[postIndex],
        completed: !updatedPosts[postIndex].completed,
      };

      updatedPosts[postIndex] = updatedPost;
      setPosts(updatedPosts);

      // Update the completion status in the database
      await updatePost(postId, { completed: updatedPost.completed });
    }
  };

  const filteredPosts = user === "admin" ? posts : posts.filter((post) => post.user === user);

  return (
    <div>
      <h1 className="text-center">Maintenance Requests</h1>
      <div id="posts">
        <table className="table table-light table-striped shadow text-center">
          <thead>
            <tr>
              <th>Unit</th>
              <th>Resident Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post._id}>
                <td>{post.unit}</td>
                <td>{post.name}</td>
                <td>{post.contact}</td>
                <td>{post.email}</td>
                <td>
                  <Link to={`/posts/${post._id}`}>
                    <div>{post.subject}</div>
                  </Link>
                </td>
                <td>
                  <div>
                    {new Date(post.createdAt).toLocaleString([], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={post.completed}
                    onChange={() => handleCompletionToggle(post._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {user !== "admin" && (
          <Link to="/posts/new">
            <button type="button" className="btn btn-outline-primary">
              New Request
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Index;
