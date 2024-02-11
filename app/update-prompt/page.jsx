"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@components/Form";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch prompt details");
        }
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (id) getPromptDetails();
  }, [id]);

  const UpdatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!id) return alert("Prompt ID not found");
    try {
      const response = await fetch(`/api/prompt/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to update prompt");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePrompt}
    />
  );
};

export default EditPrompt;
