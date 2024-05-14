// src/ui.tsx
import {
  emit,
  on,
  once,
  // ...
} from '@create-figma-plugin/utilities'
import { render, Container, Text, VerticalSpace,Button } from '@create-figma-plugin/ui'
import { h } from 'preact'
import '!./output.css'
import Flows from './components/flows'
import FrameRate from './components/frameRate'
import Quality from './components/Quality'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Plugin (props: { greeting: string }) {
  const [flowList, setFlowList] = useState([]);
  function playPreview() {
    emit("play-preview");
  }
  const [imageUrl, setImageUrl] = useState('');


  on("preview-image", async (data: { fileName: string, encodedUnit8Array: any }) => {
      console.log("recieved:",{
        fileName: data.fileName,
        bytes:data.encodedUnit8Array
      });
      
      const frameImage = new File([data.encodedUnit8Array],`${data.fileName}.png`, { type: 'image/png' });
      const url = URL.createObjectURL(frameImage);
      setImageUrl(url);
  });
  
  on("export-image", async (data:{export_image_data:{ fileName: string, encodedUnit8Array: any },uniqueSuffix:string}) => {
    try {
      console.log("recieved for export:",{
        fileName: data.export_image_data.fileName,
        bytes:data.export_image_data.encodedUnit8Array
      });
      const fileName= data.export_image_data.fileName;
      const bytes=data.export_image_data.encodedUnit8Array;
      const frameImage = new File([bytes],`${fileName}.png`, { type: 'image/png' });      
      let formdata = new FormData() 
      formdata.append("image",frameImage);
      formdata.append("request_id",data.uniqueSuffix);
      await axios.post('http://localhost:3000/api/save-image', formdata,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
      console.log("Image saved successfully.");
    } catch (error) {
      console.error("Error saving image:", error);
    }
  });
  return (
    <Container space='medium' class="flex justify-center">
      <VerticalSpace space='medium' />
      <div>
        <span class="font-bold">Select flow</span>
        <div class={"w-24"}>
          <Flows/>
        </div>
      </div>
      <VerticalSpace space='medium' />

      <div className={"flex justify-center"}>
        {imageUrl && <img src={imageUrl} alt="Image" className={"w-50%"}/>}
      </div>
      <VerticalSpace space='medium' />
      <div class={"flex"}>
        <FrameRate/>
        <Quality/>
      </div>
      
      <VerticalSpace space='medium' />
      <div class="w-[100%]">
        <Button secondary>
          Export animation
        </Button>
        <Button  onClick={playPreview} secondary>
          Play
        </Button>
      </div>
    </Container>
  )
}
 
export default render(Plugin)