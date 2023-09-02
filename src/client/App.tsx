import "./App.css";
import { useState } from "react";

function App() {
  const [previews, setPreviews] = useState<JSX.Element[]>([]);
  const [imgFiles, setImgFiles] = useState<File[]>([])
  const [submitState, setSubmitState] = useState<string>("pre");

  function handleUpload(files : FileList | null) {
    if (!files) return;
     
    for (let i=0; i<files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        continue;
      }
      
      setImgFiles(p => [...p, file]);
      
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = (
          <img key={`i${Math.random()*10}`} src={e.target?.result as string} alt={`preview ${i}`} className="preview" />
        );
        setPreviews(p=>[...p, img]);
      }

      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit() {
    for (let file of imgFiles) {
      const formData = new FormData;
      formData.append('img', file);
      console.log(file.name);
       
      try {
        const res = await fetch("http://127.0.0.1:3000/upload",{
          method:"POST",
          body: formData
        });
        const data = await res.json();
        console.log(data);
        setSubmitState("success")
      } catch(error) {
        console.log(`error: ${error}`)
        setSubmitState("failed");
      }
    }
  }

  return (
    <div className="App">
      {previews}
      <input type="file" accept="image/*" multiple onChange={(e)=>handleUpload(e.target.files)}/>
      <button onClick={()=>handleSubmit()}>upload image</button>    
      <button>submit images</button>    
    </div>
  );
}

export default App;
