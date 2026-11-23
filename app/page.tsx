"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Post = { id: number; title: string; content: string; createdAt: string; updatedAt: string };

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPosts() {
    setLoading(true);
    try {
      const response = await fetch("/api/posts", { cache: "no-store" });
      if (!response.ok) throw new Error("Gagal mengambil posts");
      setPosts(await response.json());
      setError("");
    } catch { setError("Tidak dapat memuat data. Pastikan database sudah disiapkan."); }
    finally { setLoading(false); }
  }
  useEffect(() => { loadPosts(); }, []);

  const filtered = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  return <main className="container py-5">
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div><h1 className="fw-bold mb-1">My Simple Blog</h1></div>
      <Link href="/create" className="btn btn-primary">+ Create Post</Link>
    </div>
    <input className="form-control mb-4" placeholder="Cari post berdasarkan judul..." value={search} onChange={e => setSearch(e.target.value)} />
    {loading && <p>Loading posts...</p>}
    {error && <div className="alert alert-danger">{error}</div>}
    {!loading && !error && filtered.length === 0 && <div className="alert alert-light border">{posts.length ? "Post tidak ditemukan." : "Belum ada post. Buat post pertama!"}</div>}
    <div className="row g-3">
      {filtered.map(post => <div className="col-12" key={post.id}><div className="card shadow-sm"><div className="card-body">
        <Link href={`/posts/${post.id}`} className="h5 text-decoration-none fw-bold">{post.title}</Link>
        <div className="small text-secondary mt-1">{new Date(post.createdAt).toLocaleString("id-ID")}</div>
        <p className="mt-3 mb-0 text-secondary">{post.content.length > 180 ? post.content.slice(0, 180) + "…" : post.content}</p>
        <Link href={`/posts/${post.id}`} className="btn btn-sm btn-outline-primary mt-3">Review</Link>
      </div></div></div>)}
    </div>
  </main>;
}
