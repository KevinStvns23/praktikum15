"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type Post = { id: number; title: string; content: string; createdAt: string; updatedAt: string };
export default function PostDetail() {
  const params = useParams<{ id: string }>(); const router = useRouter();
  const [post, setPost] = useState<Post | null>(null); const [error, setError] = useState("");
  useEffect(() => { fetch(`/api/posts/${params.id}`).then(async r => { if (!r.ok) throw new Error("Post tidak ditemukan"); return r.json(); }).then(setPost).catch(e => setError(e.message)); }, [params.id]);
  async function remove() {
    if (!confirm("Yakin ingin menghapus post ini?")) return;
    const r = await fetch(`/api/posts/${params.id}`, { method: "DELETE" });
    if (r.ok) router.push("/"); else setError("Gagal menghapus post.");
  }
  return <main className="container py-5"><Link href="/" className="text-decoration-none">← Kembali ke Blog</Link>
    {error && <div className="alert alert-danger mt-3">{error}</div>}
    {!post && !error && <p className="mt-4">Loading...</p>}
    {post && <article className="card shadow-sm mt-3"><div className="card-body p-4 p-md-5"><h1 className="fw-bold">{post.title}</h1><p className="text-secondary small">Dibuat: {new Date(post.createdAt).toLocaleString("id-ID")} · Diubah: {new Date(post.updatedAt).toLocaleString("id-ID")}</p><hr/><div className="post-content">{post.content}</div><div className="mt-4"><Link href={`/posts/${post.id}/edit`} className="btn btn-warning me-2">Update</Link><button onClick={remove} className="btn btn-danger">Delete</button></div></div></article>}
  </main>;
}
