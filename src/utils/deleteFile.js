import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

export async function deleteFile(storagePath) {
  if (!storagePath) return;

  const fileRef = ref(storage, storagePath);

  await deleteObject(fileRef);
}