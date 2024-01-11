import { Button, Container, Form, Spinner } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import { FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../Store/Slices/post";
import Link from "./../Components/Link";

const Posts = () => {
  const { data, isLoading } = useFetch("/posts");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPosts(data));
  }, [data, dispatch]);

  const posts = useSelector((store) => store.post.posts);

  async function handleCreatePost(e) {
    e.preventDefault();

    if (!text) return toast("Text is required", { type: "error" });

    setLoading(true);
    try {
      const { data } = await axios.post("/posts", { text });
      dispatch(setPosts([data, ...posts]));
    } catch (error) {
      console.log(error);
      const errors = error?.response?.data?.errors;
      if (errors?.length > 0) {
        errors.forEach((err) => {
          toast(err.msg, { type: "error" });
        });
      }
    } finally {
      setLoading(false);
      setText("");
    }
  }

  return (
    <section id="posts">
      <Container>
        <h1 className="text-info display-4 fw-bold">Sign In</h1>
        <p className="fs-4">
          <FaUser /> Welcome to the community
        </p>
        <p className="bg-info text-light py-2 px-4">Say Something...</p>
        <Form className="d-grid gap-3 my-3" onSubmit={handleCreatePost}>
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            as="textarea"
            placeholder="Create a Post"
          />
          <Button type="submit" variant="dark" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </Form>
        {isLoading ? (
          <Spinner />
        ) : (
          posts && (
            <div>
              {posts.map((post) => {
                return (
                  <div
                    key={post._id}
                    className="d-flex p-3 my-5 border border-1"
                  >
                    <div className="text-center w-25">
                      <img
                        src={post.avatar}
                        alt=""
                        className="rounded-circle"
                      />
                      <br />
                      <Link to={`/profile/${post.user}`}>{post.name}</Link>
                    </div>
                    <div className="d-flex flex-column gap-3 justify-content-center px-5">
                      <h4>{post.text}</h4>
                      <span>
                        Posted on {new Date(post.date).toLocaleDateString()}
                      </span>
                      <div className="d-flex gap-2">
                        <Button variant="light">
                          <FaThumbsUp />
                        </Button>
                        <Button variant="light">
                          <FaThumbsDown />
                        </Button>
                        <Button
                          variant="info"
                          as={Link}
                          to={`/posts/${post._id}`}
                        >
                          Diccussion
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <ul>
                {posts.map((post) => {
                  return (
                    <li key={post._id}>
                      <Link to={`/posts/${post._id}`}>
                        {post.text} ({post.likes.length}{" "}
                        {post.likes.length > 1 ? "likes" : "like"})
                      </Link>
                    </li>
                  );
                })}
              </ul> */}
            </div>
          )
        )}
      </Container>
    </section>
  );
};

export default Posts;
