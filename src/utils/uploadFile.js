import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export async function uploadFile(file, folder, clientId) {
  if (!file) {
    throw new Error("No file selected.");
  }

  const fileName = `${Date.now()}-${file.name}`;

  const storageRef = ref(
    storage,
    `${folder}/${clientId}/${fileName}`
  );

  await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(storageRef);

return {
  url: downloadURL,
  fileName: file.name,
  fileSize: file.size,
  fileType: file.type,
  storagePath: storageRef.fullPath,
  uploadDate: Date.now(),
};
}