import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import emailjs from "@emailjs/browser";
import { auth, db, storage } from "../firebase";

import {
  ArrowLeft,
  FileText,
  GraduationCap,
  MessageSquare,
  Receipt,
  Save,
  UploadCloud,
} from "lucide-react";

const SERVICE_ID = "service_5vyb6vb";
const CUSTOMER_TEMPLATE_ID = "template_hwroov8";
const PUBLIC_KEY = "R82-i7Mc5PSHOL3Yi";

export default function AdminClient() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [client, setClient] = useState(null);
  const [adminNote, setAdminNote] = useState("");

  const [documentFile, setDocumentFile] = useState(null);
  const [trainingFile, setTrainingFile] = useState(null);
  const [invoiceFile, setInvoiceFile] = useState(null);

  const [progressForm, setProgressForm] = useState({
    progress: 0,
    currentPhase: "",
    nextStep: "",
    programPurchased: "",
    startDate: "",
    nextCall: "",
    clientNotes: "",
  });

  const [documentForm, setDocumentForm] = useState({
    name: "",
    type: "",
    category: "01 - Agreements & Receipts",
  });

  const [trainingForm, setTrainingForm] = useState({
    title: "",
    type: "Video",
    description: "",
    url: "",
    locked: false,
  });

  const [invoiceForm, setInvoiceForm] = useState({
    invoiceNumber: "",
    service: "",
    amount: "",
    dueDate: "",
    status: "Pending",
    paymentLink: "",
  });

  const categories = [
    "01 - Agreements & Receipts",
    "02 - Mentorship Program",
    "03 - Operations Setup & Systems",
    "04 - Dispatch / Broker / Load Systems",
    "05 - Money System / Startup Cost Tools",
    "06 - Progress Reports",
    "07 - Client Uploads",
    "08 - Bonus Resources",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      const adminSnap = await getDoc(doc(db, "users", user.uid));
      const adminData = adminSnap.data();
      const adminRole = adminData?.role || adminData?.documents?.role;

      if (adminRole !== "admin" && adminRole !== "team") {
        navigate("/dashboard");
        return;
      }

      const clientSnap = await getDoc(doc(db, "users", clientId));

      if (!clientSnap.exists()) {
        alert("Client not found.");
        navigate("/admin");
        return;
      }

      const data = clientSnap.data();

      setClient({
        id: clientSnap.id,
        ...data,
      });

      setProgressForm({
        progress: data.progress || 0,
        currentPhase: data.currentPhase || "",
        nextStep: data.nextStep || "",
        programPurchased: data.programPurchased || "",
        startDate: data.startDate || "",
        nextCall: data.nextCall || "",
        clientNotes: data.clientNotes || "",
      });

      setLoading(false);
    });

    return () => unsubscribe();
  }, [clientId, navigate]);

  const clientName = (
    client?.fullName ||
    client?.documents?.fullName ||
    "Client"
  )
    .split("|")[0]
    .trim();

  const clientEmail = client?.email || client?.documents?.email || "";

  const uploadFile = async (file, folder) => {
    if (!file) return "";

    const safeFileName = file.name.replaceAll(" ", "_");

    const fileRef = ref(
      storage,
      `${folder}/${clientId}/${Date.now()}-${safeFileName}`
    );

    await uploadBytes(fileRef, file);

    return await getDownloadURL(fileRef);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const refreshClient = async () => {
    const clientSnap = await getDoc(doc(db, "users", clientId));

    if (clientSnap.exists()) {
      setClient({
        id: clientSnap.id,
        ...clientSnap.data(),
      });
    }
  };

  const addActivity = async (message) => {
    await setDoc(
      doc(db, "users", clientId),
      {
        activityTimeline: arrayUnion({
          message,
          createdAt: new Date().toISOString(),
        }),
      },
      { merge: true }
    );
  };

  const handleDeleteDocument = async (indexToDelete) => {
    const updatedDocuments = (client.documents || []).filter(
      (_, index) => index !== indexToDelete
    );

    await updateDoc(doc(db, "users", clientId), {
      documents: updatedDocuments,
    });

    await addActivity("Document removed.");

    await refreshClient();

    alert("Document deleted.");
  };

  const handleSaveProgress = async () => {
    setSaving(true);

    await setDoc(
      doc(db, "users", clientId),
      {
        ...progressForm,
        progress: Number(progressForm.progress),
        updatedAt: new Date(),
      },
      { merge: true }
    );

    await addActivity(`Progress updated to ${progressForm.progress}%.`);

    await refreshClient();
    setSaving(false);
    alert("Progress updated.");
  };

const handleAddDocument = async (e) => {
  e.preventDefault();

  alert("Upload Document clicked");

  if (!documentFile) {
    alert("Please choose a document file first.");
    return;
  }

  try {
    const fileUrl = await uploadFile(documentFile, "client-documents");

    await setDoc(
      doc(db, "users", clientId),
      {
        documents: arrayUnion({
          ...documentForm,
          url: fileUrl,
          createdAt: new Date().toISOString(),
        }),
      },
      { merge: true }
    );

    await addActivity(`Document added: ${documentForm.name}.`);

    setDocumentForm({
      name: "",
      type: "",
      category: "01 - Agreements & Receipts",
    });

    setDocumentFile(null);

    await refreshClient();

    alert("Document uploaded successfully.");
  } catch (error) {
    console.error("UPLOAD DOCUMENT ERROR:", error);
    alert(error.message || "Document upload failed.");
  }
};

  const handleAddTraining = async (e) => {
    e.preventDefault();

    let fileUrl = trainingForm.url;

    if (trainingFile) {
      fileUrl = await uploadFile(trainingFile, "client-training");
    }

    await setDoc(
      doc(db, "users", clientId),
      {
        training: arrayUnion({
          ...trainingForm,
          url: fileUrl,
          createdAt: new Date().toISOString(),
        }),
      },
      { merge: true }
    );

    await addActivity(`Training assigned: ${trainingForm.title}.`);

    setTrainingForm({
      title: "",
      type: "Video",
      description: "",
      url: "",
      locked: false,
    });

    setTrainingFile(null);

    await refreshClient();
    alert("Training added.");
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();

    let fileUrl = "";

    if (invoiceFile) {
      fileUrl = await uploadFile(invoiceFile, "client-invoices");
    }

    await setDoc(
      doc(db, "users", clientId),
      {
        invoices: arrayUnion({
          ...invoiceForm,
          url: fileUrl,
          createdAt: new Date().toISOString(),
        }),
      },
      { merge: true }
    );

    await emailjs.send(
      SERVICE_ID,
      CUSTOMER_TEMPLATE_ID,
      {
        name: clientName,
        from_name: "Apex Route Consultant Group",
        user_name: clientName,
        user_email: clientEmail,
        to_email: clientEmail,
        reply_to: "ceo@apexrouteconsulting.com",
        invoice_number: invoiceForm.invoiceNumber,
        invoice_service: invoiceForm.service,
        invoice_amount: invoiceForm.amount,
        invoice_status: invoiceForm.status,
        message: "A new invoice has been added to your Apex client portal.",
      },
      PUBLIC_KEY
    );

    await addActivity(`Invoice added: ${invoiceForm.invoiceNumber}.`);

    setInvoiceForm({
      invoiceNumber: "",
      service: "",
      amount: "",
      dueDate: "",
      status: "Pending",
      paymentLink: "",
    });

    setInvoiceFile(null);

    await refreshClient();
    alert("Invoice added.");
  };

  const handleSaveAdminNote = async () => {
    if (!adminNote.trim()) return;

    await setDoc(
      doc(db, "users", clientId),
      {
        adminNotes: arrayUnion({
          note: adminNote,
          createdAt: new Date().toISOString(),
        }),
      },
      { merge: true }
    );

    await addActivity("Internal admin note added.");

    setAdminNote("");

    await refreshClient();

    alert("Admin note saved.");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pt-8 text-white md:px-8">
        <p className="text-[#D4AF37]">Loading client...</p>
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
              Manage Client
            </h1>

            <p className="mt-3 text-white/70">
              Updating account for{" "}
              <span className="text-[#D4AF37]">{clientName}</span>
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
              className="border border-white/30 px-5 py-3 text-sm font-black uppercase text-white hover:bg-white hover:text-black"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard title="Email" value={clientEmail || "Not provided"} />
          <InfoCard
            title="Phone"
            value={client.phone || client.documents?.phone || "Not provided"}
          />
          <InfoCard
            title="Role"
            value={client.role || client.documents?.role || "client"}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="border border-gray-300 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Save className="text-[#caa12a]" />
              <h2 className="text-xl font-black">Update Progress</h2>
            </div>

            <div className="mt-5 grid gap-4">
              <input
                className="input-admin"
                placeholder="Program Purchased"
                value={progressForm.programPurchased}
                onChange={(e) =>
                  setProgressForm({
                    ...progressForm,
                    programPurchased: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                placeholder="Start Date"
                value={progressForm.startDate}
                onChange={(e) =>
                  setProgressForm({
                    ...progressForm,
                    startDate: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                type="number"
                placeholder="Progress %"
                value={progressForm.progress}
                onChange={(e) =>
                  setProgressForm({
                    ...progressForm,
                    progress: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                placeholder="Current Phase"
                value={progressForm.currentPhase}
                onChange={(e) =>
                  setProgressForm({
                    ...progressForm,
                    currentPhase: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                placeholder="Next Step"
                value={progressForm.nextStep}
                onChange={(e) =>
                  setProgressForm({
                    ...progressForm,
                    nextStep: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                placeholder="Next Call"
                value={progressForm.nextCall}
                onChange={(e) =>
                  setProgressForm({
                    ...progressForm,
                    nextCall: e.target.value,
                  })
                }
              />

              <textarea
                className="input-admin"
                rows="5"
                placeholder="Client Notes"
                value={progressForm.clientNotes}
                onChange={(e) =>
                  setProgressForm({
                    ...progressForm,
                    clientNotes: e.target.value,
                  })
                }
              />

              <button
                onClick={handleSaveProgress}
                disabled={saving}
                className="bg-[#caa12a] px-5 py-3 text-sm font-black uppercase text-black hover:bg-black hover:text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Progress"}
              </button>
            </div>
          </div>

          <form
            onSubmit={handleAddDocument}
            className="border border-gray-300 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <FileText className="text-[#caa12a]" />
              <h2 className="text-xl font-black">Add Vault Document</h2>
            </div>

            <div className="mt-5 grid gap-4">
              <input
                required
                className="input-admin"
                placeholder="Document Name"
                value={documentForm.name}
                onChange={(e) =>
                  setDocumentForm({
                    ...documentForm,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                placeholder="Type"
                value={documentForm.type}
                onChange={(e) =>
                  setDocumentForm({
                    ...documentForm,
                    type: e.target.value,
                  })
                }
              />

              <select
                className="input-admin"
                value={documentForm.category}
                onChange={(e) =>
                  setDocumentForm({
                    ...documentForm,
                    category: e.target.value,
                  })
                }
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <input
                required
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="input-admin"
                onChange={(e) => setDocumentFile(e.target.files[0])}
              />

              <button
  type="submit"
  className="bg-[#caa12a] px-5 py-3 text-sm font-black uppercase text-black hover:bg-black hover:text-white"
>
  Upload Document
</button>
            </div>
          </form>

          <form
            onSubmit={handleAddTraining}
            className="border border-gray-300 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="text-[#caa12a]" />
              <h2 className="text-xl font-black">Add Training</h2>
            </div>

            <div className="mt-5 grid gap-4">
              <input
                required
                className="input-admin"
                placeholder="Training Title"
                value={trainingForm.title}
                onChange={(e) =>
                  setTrainingForm({
                    ...trainingForm,
                    title: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                placeholder="Type: Video, SOP, Guide, Homework"
                value={trainingForm.type}
                onChange={(e) =>
                  setTrainingForm({
                    ...trainingForm,
                    type: e.target.value,
                  })
                }
              />

              <textarea
                className="input-admin"
                rows="4"
                placeholder="Description"
                value={trainingForm.description}
                onChange={(e) =>
                  setTrainingForm({
                    ...trainingForm,
                    description: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                placeholder="Training URL optional"
                value={trainingForm.url}
                onChange={(e) =>
                  setTrainingForm({
                    ...trainingForm,
                    url: e.target.value,
                  })
                }
              />

              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4"
                className="input-admin"
                onChange={(e) => setTrainingFile(e.target.files[0])}
              />

              <label className="flex items-center gap-2 text-sm font-bold">
                <input
                  type="checkbox"
                  checked={trainingForm.locked}
                  onChange={(e) =>
                    setTrainingForm({
                      ...trainingForm,
                      locked: e.target.checked,
                    })
                  }
                />
                Locked Content
              </label>

              <button className="bg-[#caa12a] px-5 py-3 text-sm font-black uppercase text-black hover:bg-black hover:text-white">
                Add Training
              </button>
            </div>
          </form>

          <form
            onSubmit={handleAddInvoice}
            className="border border-gray-300 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Receipt className="text-[#caa12a]" />
              <h2 className="text-xl font-black">Add Invoice</h2>
            </div>

            <div className="mt-5 grid gap-4">
              <input
                required
                className="input-admin"
                placeholder="Invoice Number"
                value={invoiceForm.invoiceNumber}
                onChange={(e) =>
                  setInvoiceForm({
                    ...invoiceForm,
                    invoiceNumber: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                placeholder="Service"
                value={invoiceForm.service}
                onChange={(e) =>
                  setInvoiceForm({
                    ...invoiceForm,
                    service: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                placeholder="Amount"
                value={invoiceForm.amount}
                onChange={(e) =>
                  setInvoiceForm({
                    ...invoiceForm,
                    amount: e.target.value,
                  })
                }
              />

              <input
                className="input-admin"
                placeholder="Due Date"
                value={invoiceForm.dueDate}
                onChange={(e) =>
                  setInvoiceForm({
                    ...invoiceForm,
                    dueDate: e.target.value,
                  })
                }
              />

              <select
                className="input-admin"
                value={invoiceForm.status}
                onChange={(e) =>
                  setInvoiceForm({
                    ...invoiceForm,
                    status: e.target.value,
                  })
                }
              >
                <option>Pending</option>
                <option>Paid</option>
              </select>

              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="input-admin"
                onChange={(e) => setInvoiceFile(e.target.files[0])}
              />

              <input
                className="input-admin"
                placeholder="Payment Link optional"
                value={invoiceForm.paymentLink}
                onChange={(e) =>
                  setInvoiceForm({
                    ...invoiceForm,
                    paymentLink: e.target.value,
                  })
                }
              />

              <button className="bg-[#caa12a] px-5 py-3 text-sm font-black uppercase text-black hover:bg-black hover:text-white">
                Add Invoice
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <ListCard
            title="Client Uploads"
            icon={UploadCloud}
            items={client.uploads || []}
          />

          <ListCard
            title="Support Tickets"
            icon={MessageSquare}
            items={client.supportTickets || []}
          />
        </div>

        <div className="mt-8 border border-gray-300 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Client Vault Documents</h2>

          <div className="mt-5 space-y-3">
            {(client.documents || []).length === 0 ? (
              <p className="text-sm text-gray-500">No documents found.</p>
            ) : (
              client.documents.map((document, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-200 p-4"
                >
                  <div>
                    <p className="font-black">{document.name}</p>

                    <p className="text-sm text-gray-500">
                      {document.category}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {document.url && (
                      <a
                        href={document.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#caa12a] px-4 py-2 text-xs font-black uppercase text-black"
                      >
                        View
                      </a>
                    )}

                    <button
                      onClick={() => handleDeleteDocument(index)}
                      className="bg-red-600 px-4 py-2 text-xs font-black uppercase text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 border border-gray-300 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-black">
            Client Activity Timeline
          </h2>

          <div className="mt-6 space-y-3">
            {(client.activityTimeline || []).length === 0 ? (
              <p className="text-sm text-gray-500">
                No activity recorded yet.
              </p>
            ) : (
              client.activityTimeline
                .slice()
                .reverse()
                .map((activity, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-[#caa12a] bg-[#f7f7f7] p-4"
                  >
                    <p className="text-sm font-bold text-black">
                      {activity.message}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="mt-8 border border-gray-300 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-black">
            Internal Admin Notes
          </h2>

          <textarea
            rows="4"
            placeholder="Add private note..."
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            className="input-admin mt-4"
          />

          <button
            onClick={handleSaveAdminNote}
            className="mt-4 bg-[#caa12a] px-5 py-3 text-sm font-black uppercase text-black hover:bg-black hover:text-white"
          >
            Save Note
          </button>

          <div className="mt-6 space-y-3">
            {(client.adminNotes || []).length === 0 ? (
              <p className="text-sm text-gray-500">No admin notes yet.</p>
            ) : (
              client.adminNotes
                .slice()
                .reverse()
                .map((note, index) => (
                  <div key={index} className="border border-gray-200 p-4">
                    <p className="text-sm text-black">{note.note}</p>

                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="border border-[#D4AF37]/30 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-gray-500">{title}</p>
      <p className="mt-2 text-xl font-black text-[#c28f00]">{value}</p>
    </div>
  );
}

function ListCard({ title, icon: Icon, items }) {
  return (
    <div className="border border-gray-300 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <Icon className="text-[#caa12a]" />
        <h2 className="text-xl font-black">{title}</h2>
      </div>

      <div className="mt-5 space-y-3">
        {items.length === 0 ? (
          <div className="rounded border border-dashed border-gray-300 p-5 text-sm text-gray-500">
            No items found.
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-3 text-sm">
              <p className="font-black">
                {item.name || item.subject || "Item"}
              </p>

              <p className="text-gray-600">
                {item.type || item.priority || ""}
              </p>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black uppercase text-[#c28f00]"
                >
                  View
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}