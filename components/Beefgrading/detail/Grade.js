import * as tf from "@tensorflow/tfjs";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const TARGET_CLASSES = {
    0: "2",
    1: "2.5",
    2: "3",
    3: "3.5",
    4: "4",
    5: "4.5",
    6: "5",
  };
  const [isModelLoading, setModel] = useState();
  const [isImage, setImage] = useState("");
  console.log(isImage);
  useEffect(() => {
    fnModel();
  }, []);

  const fnModel = async () => {
    const model = await tf.loadLayersModel("/model_2/model.json");
    setModel(model);
  };

  const handleChange = async (event) => {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(URL.createObjectURL(i));
    }
  };
  // const uploadFile = async () => {
  //   const data = new FormData();
  //   data.append("file", file);
  //   data.append("upload_preset", "graphql-basic");

  //   const res = await fetch(
  //     "https://api.cloudinary.com/v1_1/da7loumgx/image/upload",
  //     {
  //       method: "post",
  //       body: data,
  //     }
  //   );

  //   const result = await res.json();
  //   console.log(result);

  //   return result.secure_url;
  // };

  const handleClick = async (event) => {
    let test2 = document.getElementById("test2223");
    let test123 = [];
    if (isModelLoading && test2) {
      let tensor = tf.browser
        .fromPixels(test2, 3)
        .resizeNearestNeighbor([224, 224]) // change the image size
        .expandDims()
        .toFloat()
        .reverse(-1);

      let predictions = await isModelLoading.predict(tensor).data();
      console.log(predictions);

      let top5 = Array.from(predictions)
        .map(function (p, i) {
          // this is Array.map
          return {
            probability: p,
            className: TARGET_CLASSES[i], // we are selecting the value from the obj
          };
        })
        .sort(function (a, b) {
          return b.probability - a.probability;
        })
        .slice(0, 1);

      document.getElementById("prediction-list").innerHTML = "";
      top5.forEach(function (p) {
        const node = document.createElement("li");
        node.innerHTML = `${p.className}: ${p.probability.toFixed(6)}`;
        document.getElementById("prediction-list").appendChild(node);
      });
      /*  test123 = */
    } /*  console.log(test123) */
    return test123;
  };

  return (
    <div>
      <button onClick={handleClick}>กด กด</button>
      <input type="file" name="file" onChange={handleChange} accept="image/*" />

      <img id="test2223" src={isImage} />

      <div id="prediction-list"></div>
    </div>
  );
}
