
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from "@firebase/storage";
import { storage } from "../firebase/initFirebase";

async function uploadImage(image) {
    const storageRef = ref(storage, `/productImages/${Date.now()}-${image.name}`);

    const response = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(response.ref);
    return url;
}

export default async function uploadImages(images) {
    const imagePromises = Array.from(images, (image) => uploadImage(image));
    const imageRes = await Promise.all(imagePromises);
    return imageRes;
}

export async function uploadImageVariants(image) {
    const storageRef = ref(storage, `/productImageVariants/${Date.now()}-${image.name}`);

    const response = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(response.ref);
    return url;
}