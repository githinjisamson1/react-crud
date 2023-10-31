import React, { useEffect, useState } from "react";
import Form from "./components/Form";

const App = () => {
  // !maintain all states at top level
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    body: "",
  });

  // ============== eventHandlers ===============
  // !handleChange
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  // !handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    createPost();

    setFormData({
      userId: "",
      title: "",
      body: "",
    });
  };

  // !handleUpdate
  const handleUpdate = (updatedItem) => {
    const updatedItems = posts.map((post) => {
      if (post.id === updatedItem.id) {
        return updatedItem;
      } else {
        return post;
      }
    });
    setPosts(updatedItems);
  };

  // !handleDelete
  const handleDelete = (item) => {
    const newItems = posts.filter((post) => {
      return post.id !== item.id;
    });
    setPosts(newItems);
  };

  // ====================== HTTP METHODS =====================
  // GET/READ
  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // POST/CREATE
  const createPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPosts([...posts, data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // PATCH/UPDATE
  const updatePost = (post) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...post,
        title: "New Title",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        handleUpdate(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // DELETE
  const deletePost = (post) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        handleDelete(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Form
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ul>
        {posts.map((post) => {
          const { id, title } = post;
          return (
            <li key={id}>
              <span>{title}</span>

              <button
                onClick={() => {
                  deletePost(post);
                }}
              >
                Delete
              </button>

              <button
                onClick={() => {
                  updatePost(post);
                }}
              >
                Update
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;

// TODO: CRUD
// CREATE: POST/[...]
// READ: GET
// UPDATE: PATCH/map
// DELETE/filter
