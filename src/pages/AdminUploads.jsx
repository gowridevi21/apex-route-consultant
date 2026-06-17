import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  LogOut,
  UploadCloud,
  XCircle,
} from "lucide-react";

export default function AdminUploads() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      const adminSnap = await getDoc(doc(db, "users", user.uid));
      const adminData = adminSnap.data();
      const adminRole = adminData?.role || adminData?.documents?.role;

      if (adminRole !== "admin") {
        navigate("/dashboard");
        return;
      }

      const usersSnap = await getDocs(collection(db, "users"));
      const allUploads = [];

      usersSnap.docs.forEach((userDoc) => {
        const data = userDoc.data();

        const clientName = (
          data.fullName ||
          data.documents?.fullName ||
          "Client"
        )
          .split("|")[0]
          .trim();

        const clientUploads = data.uploads || [];

        clientUploads.forEach((upload, index) => {
          allUploads.push({
            ...upload,
            uploadIndex: index,
            clientId: userDoc.id,
            clientName,
            clientEmail: data.email || data.documents?.email || "",
          });
        });
      });

      setUploads(allUploads);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const updateUploadStatus = async (uploadToUpdate, newStatus) => {
    const userRef = doc(db, "users", uploadToUpdate.clientId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const data = userSnap.data();
    const currentUploads = data.uploads || [];

    const updatedUploads = currentUploads.map((upload, index) => {
      if (index === uploadToUpdate.uploadIndex) {
        return {
          ...upload,
          status: newStatus,
          reviewedAt: new Date().toISOString(),
        };
      }

      return upload;
    });

    await updateDoc(userRef, {
      uploads: updatedUploads,
    });

    setUploads((prev) =>
      prev.map((upload) =>
        upload.clientId === uploadToUpdate.clientId &&
        upload.uploadIndex === uploadToUpdate.uploadIndex
          ? { ...upload, status: newStatus }
          : upload
      )
    );

    alert(`Upload marked as ${newStatus}.`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pt-8 text-white md:px-8">
        <p className="text-[#D4AF37]">Loading upload review...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-8 text-black md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-black uppercase tracking-wide text-[#D4AF37]">
              Apex Admin Portal
            </p>

            <h1 className="mt-2 text-3xl font-black uppercase text-white md:text-5xl">
              Upload Review Center
            </h1>

            <p className="mt-3 text-white/70">
              Review client uploaded documents and mark them as reviewed,
              approved, or rejected.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 border border-[#D4AF37] px-5 py-3 text-sm font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              <ArrowLeft size={16} />
              Back
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-sm font-black uppercase text-white hover:bg-white hover:text-black"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="rounded-md border border-[#D4AF37]/30 bg-white p-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <UploadCloud className="text-[#caa12a]" size={28} />
            <h2 className="text-2xl font-black text-black">
              Client Uploads
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {uploads.length === 0 ? (
              <div className="rounded border border-dashed border-gray-300 p-6 text-sm text-gray-500">
                No uploaded documents found.
              </div>
            ) : (
              uploads.map((upload, index) => (
                <div
                  key={`${upload.clientId}-${upload.uploadIndex}-${index}`}
                  className="border border-gray-300 bg-[#f7f7f7] p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-lg font-black text-black">
                        {upload.name || "Uploaded Document"}
                      </p>

                      <div className="mt-4 grid gap-2 text-sm md:grid-cols-2">
                        <p>
                          <span className="font-black">Client:</span>{" "}
                          {upload.clientName}
                        </p>

                        <p>
                          <span className="font-black">Email:</span>{" "}
                          {upload.clientEmail || "Not provided"}
                        </p>

                        <p>
                          <span className="font-black">Type:</span>{" "}
                          {upload.type || "Document"}
                        </p>

                        <p>
                          <span className="font-black">Status:</span>{" "}
                          {upload.status || "Uploaded"}
                        </p>

                        {upload.createdAt && (
                          <p>
                            <span className="font-black">Uploaded:</span>{" "}
                            {new Date(upload.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      {upload.url && (
                        <a
                          href={upload.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 bg-[#caa12a] px-4 py-2 text-xs font-black uppercase text-black hover:bg-black hover:text-white"
                        >
                          <FileText size={14} />
                          View File
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => updateUploadStatus(upload, "Reviewed")}
                        className="border border-[#caa12a] px-4 py-2 text-xs font-black uppercase text-black hover:bg-[#caa12a]"
                      >
                        Reviewed
                      </button>

                      <button
                        onClick={() => updateUploadStatus(upload, "Approved")}
                        className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 text-xs font-black uppercase text-green-700 hover:bg-green-200"
                      >
                        <CheckCircle size={14} />
                        Approve
                      </button>

                      <button
                        onClick={() => updateUploadStatus(upload, "Rejected")}
                        className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 text-xs font-black uppercase text-red-700 hover:bg-red-200"
                      >
                        <XCircle size={14} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}