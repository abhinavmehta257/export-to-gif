import { emit } from "@create-figma-plugin/utilities";

// Function to export a frame as a PNG image
export default async function exportFrameAsPNG(frame: FrameNode, fileName: string,quality:string) {
    // await figma.viewport.scrollAndZoomIntoView([frame]);
    // Save the PNG image to the user's desktop or handle it as needed
    console.log("id:",frame.id);
    
    const bytes = await frame.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: parseInt(quality) },
    })
    console.log("bytes: ",bytes);
    const encodedUnit8Array = bytes;
    return {fileName,encodedUnit8Array}
  }
  
  