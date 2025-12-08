// app/page.jsx
"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
    <main className="min-h-screen bg-gray-50 text-slate-900">
      {/* HERO */}
      <section className="bg-linear-to-r from-sky-600 to-indigo-600 text-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              CloudVault — Smart Cloud Media Manager
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Upload, manage and share your images, videos & documents securely — built with Next.js and modern cloud storage.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/upload" className="inline-block bg-white text-sky-700 px-6 py-3 rounded-lg font-medium shadow hover:opacity-95">
                Upload Media
              </Link>
              <Link href="/sign-in" className="inline-block border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10">
                Sign in
              </Link>
            </div>

            <p className="mt-6 text-sm opacity-80">
              Demo account available — check the <Link href="/demo" className="underline">demo</Link> or view the <Link href="/docs" className="underline">docs</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold">What CloudVault Does</h2>
            <p className="text-slate-500 mt-2">All the essentials to manage and deliver media fast.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Cloud Storage</h3>
              <p className="text-sm text-slate-600">Upload files directly to Cloudinary / S3 / Azure Blob with resumable uploads and metadata.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Transform & Optimize</h3>
              <p className="text-sm text-slate-600">Automatic image/video transformations, format conversions and CDN delivery for fast performance.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Secure Sharing</h3>
              <p className="text-sm text-slate-600">Generate expiring signed URLs, role-based access, and shareable links.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold">How it works</h2>
            <p className="text-slate-500 mt-2">A simple 3-step flow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-slate-100 text-center">
              <div className="text-3xl mb-4">1</div>
              <h4 className="font-medium mb-2">Upload</h4>
              <p className="text-sm text-slate-600">Choose files, add tags and metadata, then upload to cloud storage.</p>
            </div>

            <div className="p-6 rounded-lg border border-slate-100 text-center">
              <div className="text-3xl mb-4">2</div>
              <h4 className="font-medium mb-2">Manage</h4>
              <p className="text-sm text-slate-600">Search, filter by tech/tags, and categorize your media assets.</p>
            </div>

            <div className="p-6 rounded-lg border border-slate-100 text-center">
              <div className="text-3xl mb-4">3</div>
              <h4 className="font-medium mb-2">Share</h4>
              <p className="text-sm text-slate-600">Create short links or secure signed URLs to share with clients or partners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY (placeholders) */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent uploads</h3>
            <Link href="/gallery" className="text-sky-600 underline">View all</Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded overflow-hidden shadow-sm h-32 flex items-center justify-center text-slate-400">
                <span>Thumbnail</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHS */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h4 className="mb-4 font-medium">Built with</h4>
          <div className="flex items-center justify-center flex-wrap gap-6">
            <span className="px-3 py-2 bg-white rounded shadow text-sm">Next.js</span>
            <span className="px-3 py-2 bg-white rounded shadow text-sm">React</span>
            <span className="px-3 py-2 bg-white rounded shadow text-sm">Cloudinary / S3 / Azure</span>
            <span className="px-3 py-2 bg-white rounded shadow text-sm">MongoDB / Cosmos DB</span>
            <span className="px-3 py-2 bg-white rounded shadow text-sm">GitHub Actions</span>
          </div>
        </div>
      </section>

     
    </main>
    <Footer/>
    </>
  );
}
