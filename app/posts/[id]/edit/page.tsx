"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
export default function EditPost() {
  const { id } = useParams<{ id: string }>(); const router = useRouter();
  const [title, setTitle] = useState(""); const [content, setContent] = useState(""); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  useEffect(() => { fetch(`/api/posts/${id}`).then(async r => { if (!r.ok) throw new Error("Post tidak ditemukan"); return r.json(); }).then(p => { setTitle(p.title); setContent(p.content); }).catch(e => setError(e.message)); }, [id]);
  async function submit(e: React.FormEvent) { e.preventDefault(); if (!title.trim() || !content.trim()) { setError("Judul dan konten wajib diisi."); return; } setBusy(true); setError(""); const r = await fetch(`/api/posts/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, content }) }); const data = await r.json(); setBusy(false); if (!r.ok) { setError(data.error || "Update gagal."); return; } router.push(`/posts/${id}`); router.refresh(); }
  return <main className="container py-5"><div className="form-card card shadow-sm"><div className="card-body p-4 p-md-5"><h1 className="fw-bold">Update Post</h1><p className="text-secondary">Edit judul dan konten.</p>{error && <div className="alert alert-danger">{error}</div>}<form onSubmit={submit}><div className="mb-3"><label className="form-label fw-semibold">Title</label><input className="form-control" value={title} onChange={e => setTitle(e.target.value)} /></div><div className="mb-4"><label className="form-label fw-semibold">Content</label><textarea className="form-control" rows={7} value={content} onChange={e => setContent(e.target.value)} /></div><button className="btn btn-warning" disabled={busy}>{busy ? "Saving..." : "Save Changes"}</button> <Link href={`/posts/${id}`} className="btn btn-outline-secondary">Cancel</Link></form></div></div></main>;
}
