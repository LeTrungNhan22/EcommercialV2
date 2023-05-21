import { useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase/initFirebase";
import { getError } from "../../utils/error";

const UploadFile = () => {
  const [downloadURL, setDownloadURL] = useState("");
  const inputEl = useRef(null);
  let [value, setValue] = useState(0);
  function uploadFile() {
    // get file
    var file = inputEl.current.files[0];
    console.log(file);
    // create a storage ref
    const storageRef = ref(storage, "user_uploads/" + file.name);
    console.log(storageRef);
    // upload file
    const task = uploadBytesResumable(storageRef, file);
    // update progress bar
    task.on(
      "state_change",
      function progress(snapshot) {
        setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      function error(err) {
        console.log(getError(err));
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((url) => {
          setDownloadURL(url);
        });
      },
      function complete() {
        alert("Uploaded to firebase storage successfully!");
      }
    );
  }

  return (
    <div style={{ margin: "5px 0" }}>
      <progress value={value} max="100" style={{ width: "100%" }}></progress>
      <br />
      <input type="file" onChange={uploadFile} ref={inputEl} />
    </div>
  );
};

export default UploadFile;
