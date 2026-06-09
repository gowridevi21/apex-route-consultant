import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import {
  FileText,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  TrendingUp,
  UploadCloud,
  User,
  Video,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function Uploads() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState("");
  const [clientName, setClientName] = useState("Client");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const requiredUploads = [
    {
      key: "ein",
      title: "EIN Document",
      description: "Upload your EIN confirmation or business tax document.",
      category: "07 - Client Uploads",
    },
    {
      key: "dot",
      title: "DOT Authority",
      description: "Upload your DOT authority document.",
      category: "07 - Client Uploads",
    },
    {
      key: "mc",
      title: "MC Authority",
      description: "Upload your MC authority document if applicable.",
      category: "07 - Client Uploads",
    },
    {
      key: "insurance",
      title: "Insurance Certificate",
      description: "Upload your active insurance certificate.",
      category: "07 - Client Uploads",
    },
    {
      key: "w9",
      title: "W-9 Form",
      description: "Upload your completed W-9 form.",
      category: "07 - Client Uploads",
    },
    {
      key: "factoring",
      title: "Factoring Documents",
      description: "Upload factoring company paperwork if applicable.",
      category: "07 - Client Uploads",
    },
    {
      key: "carrierPacket",
      title: "Carrier Packet",
      description: "Upload your carrier packet or onboarding packet.",
      category: "07 - Client Uploads",
    },
    {
      key: "other",
      title: "Other Documents",
      description: "Upload any additional documents requested by Apex.",
      category: "07 - Client Uploads",
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      const userSnap = await getDoc(doc(db, "users", user.uid));

      if (userSnap.exists()) {
        const data = userSnap.data();

        const cleanName = (data.fullName || user.displayName || "Client")
          .split("|")[0]
          .trim();

        setClientName(cleanName);
        setUploadedFiles(data.uploads || []);
      } else {
        const cleanName = (user.displayName || "Client")
          .split("|")[0]
          .trim();

        setClientName(cleanName);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const handleFileUpload = async (uploadType, file) => {
    if (!file) return;

    const user = auth.currentUser;

    if (!user) {
      alert("Please sign in first.");
      return;
    }

    setUploadingKey(uploadType.key);

    try {
      const safeFileName = file.name.replaceAll(" ", "_");
      const timestamp = file.lastModified;

      const storagePath = `client_uploads/${user.uid}/${uploadType.key}_${timestamp}_${safeFileName}`;
      const storageRef = ref(storage, storagePath);

      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      const uploadRecord = {
        key: uploadType.key,
        name: file.name,
        type: uploadType.title,
        category: uploadType.category,
        url: downloadURL,
        status: "Uploaded",
        createdAt: new Date().toISOString(),
      };

      await setDoc(
        doc(db, "users", user.uid),
        {
          uploads: arrayUnion(uploadRecord),
          documents: arrayUnion({
            name: file.name,
            type: uploadType.title,
            category: "07 - Client Uploads",
            url: downloadURL,
            createdAt: new Date().toISOString(),
          }),
        },
        { merge: true }
      );

      setUploadedFiles((prev) => [...prev, uploadRecord]);
      alert("Document uploaded successfully.");
    } catch (error) {
      console.error(error);
      //alert("Upload failed. Please check Firebase Storage setup.");
    }

    setUploadingKey("");
  };

  const getUploadStatus = (key) => {
    const found = uploadedFiles.find((item) => item.key === key);

    if (!found) {
      return {
        label: "Missing",
        className: "bg-red-100 text-red-600",
        icon: Clock,
      };
    }

    return {
      label: found.status || "Uploaded",
      className: "bg-green-100 text-green-600",
      icon: CheckCircle,
    };
  };

  const sidebarLinks = [
    ["Dashboard", "/dashboard", LayoutDashboard],
    ["My Vault", "/my-vault", FileText],
    ["Progress", "/progress", TrendingUp],
    ["Training", "/training", Video],
    ["Uploads", "/uploads", UploadCloud],
    ["Invoices", "/invoices", Receipt],
    ["Support", "/support", MessageSquare],
    ["Profile", "/profile", User],
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pt-8 text-white md:px-8">
        <p className="text-[#D4AF37]">Loading uploads...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-8 text-black md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="font-black uppercase tracking-wide text-[#D4AF37]">
            Apex Client Portal
          </p>

          <h1 className="mt-2 text-3xl font-black uppercase text-white md:text-5xl">
            Uploads
          </h1>

          <p className="mt-3 max-w-3xl text-white/70">
            Upload EIN, DOT, insurance, W-9, factoring, carrier packet, and
            other documents requested by Apex.
          </p>
        </div>

        <div className="overflow-hidden rounded-md border border-[#D4AF37]/30 bg-white shadow-2xl">
          <div className="flex flex-col gap-4 bg-[#0b1118] px-6 py-5 text-white md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo1.png"
                alt="Apex Logo"
                className="h-10 w-auto"
              />

              <h2 className="text-lg font-black uppercase tracking-wide">
                Apex Client Portal
              </h2>
            </div>

            <div className="text-sm font-bold">
              <Link to="/profile" className="hover:text-[#D4AF37]">
                Profile
              </Link>{" "}
              |{" "}
              <Link to="/support" className="hover:text-[#D4AF37]">
                Support
              </Link>{" "}
              |{" "}
              <button onClick={handleLogout} className="hover:text-[#D4AF37]">
                Logout
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-[260px_1fr]">
            <aside className="bg-[#eee9dc] p-5">
              {sidebarLinks.map(([name, path, Icon]) => (
                <Link
                  key={name}
                  to={path}
                  className={`mb-3 flex items-center gap-3 px-5 py-4 text-sm font-black uppercase transition ${
                    name === "Uploads"
                      ? "bg-[#caa12a] text-black"
                      : "text-black hover:bg-[#d8cfae]"
                  }`}
                >
                  <Icon size={18} />
                  {name}
                </Link>
              ))}
            </aside>

            <div className="bg-[#f7f7f7] p-6 md:p-8">
              <h2 className="text-3xl font-black text-black">
                {clientName}'s Uploads
              </h2>

              <p className="mt-3 text-gray-600">
                Upload the documents Apex needs to complete your onboarding,
                compliance, and operations setup.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {requiredUploads.map((uploadType) => {
                  const status = getUploadStatus(uploadType.key);
                  const StatusIcon = status.icon;

                  return (
                    <div
                      key={uploadType.key}
                      className="border border-gray-300 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#caa12a]">
                            <UploadCloud
                              size={24}
                              className="text-[#caa12a]"
                            />
                          </span>

                          <div>
                            <h3 className="text-lg font-black text-black">
                              {uploadType.title}
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                              {uploadType.description}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 rounded px-3 py-1 text-xs font-black uppercase ${status.className}`}
                        >
                          <StatusIcon size={13} />
                          {status.label}
                        </span>
                      </div>

                      <div className="mt-6">
                        <label className="inline-flex cursor-pointer items-center gap-2 bg-[#caa12a] px-5 py-3 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white">
                          {uploadingKey === uploadType.key
                            ? "Uploading..."
                            : "Choose File"}
                          <input
                            type="file"
                            className="hidden"
                            disabled={uploadingKey === uploadType.key}
                            onChange={(e) =>
                              handleFileUpload(uploadType, e.target.files[0])
                            }
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-8 border border-gray-300 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black">Uploaded Files</h3>

                  <div className="mt-5 space-y-3">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex flex-col gap-3 border-b border-gray-200 pb-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-[#caa12a]" />
                          <div>
                            <p className="text-sm font-black text-black">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {file.type} • {file.status || "Uploaded"}
                            </p>
                          </div>
                        </div>

                        {file.url && (
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-black uppercase text-[#c28f00]"
                          >
                            View
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 rounded border border-[#caa12a]/40 bg-[#f2efe4] p-5">
                <p className="text-sm font-bold text-black">
                  Uploaded documents are saved to your client account and added
                  to your Client Uploads folder in My Vault.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/dashboard"
                  className="bg-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
                >
                  Back to Dashboard
                </Link>

                <Link
                  to="/support"
                  className="border border-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-[#caa12a]"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}