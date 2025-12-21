"use client"

import { useState, useOptimistic } from "react";

export default function Comments() {
    const [comments, setComments] = useState([
        { id: 1, text: "First comment" }
    ]);

    // Setup optimistic state
    const [optimisticComments, addOptimisticComment] = useOptimistic(
        comments,
        (state, newCommentText) => [
            ...state,
            { id: Date.now(), text: newCommentText, pending: true }
        ]
    );

    async function handleAddComment(formData) {
        const text = formData.get("comment");

        // Show optimistic comment immediately
        addOptimisticComment(text);

        try {
            // Simulate API call
            const savedComment = await fakeApiSave(text);
            setComments((prev) => [...prev, savedComment]);
        } catch (err) {
            console.error("Failed to save comment:", err);
            // Optionally handle rollback here
        }
    }

    return (
        <form action={handleAddComment}>
            <input name="comment" placeholder="Write a comment..." required />
            <button type="submit">Add</button>

            <ul>
                {optimisticComments.map((c) => (
                    <li key={c.id} style={{ opacity: c.pending ? 0.5 : 1 }}>
                        {c.text} {c.pending && "(sending...)"}
                    </li>
                ))}
            </ul>
        </form>
    );
}

// Fake API function
function fakeApiSave(text) {
    return new Promise((resolve) =>
        setTimeout(() => resolve({ id: Date.now(), text }), 1000)
    );
}