"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePost() {
  const [title, setTitle] = useState(""); const [content, setContent] = useState(""); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const router = useRouter();
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    if (!title.trim() || !content.trim()) { setError("Judul dan konten wajib diisi."); return; }
    setBusy(true);
    const response = await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, content }) });
    const result = await response.json(); setBusy(false);
    if (!response.ok) { setError(result.error || "Gagal membuat post."); return; }
    router.push(`/posts/${result.id}`); router.refresh();
  }
  return <main className="container py-5"><div className="form-card card shadow-sm"><div className="card-body p-4 p-md-5"><h1 className="fw-bold">Create New Post</h1><p className="text-secondary">Tambah artikel ke blog.</p>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={submit}><div className="mb-3"><label className="form-label fw-semibold">Title</label><input className="form-control" value={title} onChange={e => setTitle(e.target.value)} placeholder="Masukkan judul post" /></div>
    <div className="mb-4"><label className="form-label fw-semibold">Content</label><textarea className="form-control" rows={7} value={content} onChange={e => setContent(e.target.value)} placeholder="Tulis konten di sini..." /></div>
    <button className="btn btn-success" disabled={busy}>{busy ? "Publishing..." : "Publish Post"}</button> <Link href="/" className="btn btn-outline-secondary">Cancel</Link></form>
  </div></div></main>;
}
