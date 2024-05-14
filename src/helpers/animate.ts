  //animate

import { emit } from "@create-figma-plugin/utilities";
import exportFrameAsPNG from "./export";

  // Function to get the next node in the flow
function getNextNode(currentNode: FrameNode): FrameNode | null {
  const reactionObject = currentNode.reactions[0] as any;
  console.log(reactionObject);
  
  if (!reactionObject) return null;
  const destinationNode = figma.currentPage.findOne(node => node.id == reactionObject.action.destinationId) as FrameNode;
  return destinationNode || null;
}

export default function animateFrames(sourceFrame:FrameNode,frame_start_id:string,uniqueSuffix:string,frameRate:string,quality:string){
    // // Assuming you have references to the source and destination frames
    // const sourceFrame = figma.root.findOne(node => node.id === '1060:2976') as FrameNode; // Set the source frame
    // const destinationFrame = figma.root.findOne(node => node.id === '1068:1058') as FrameNode; // Set the destination frame
    const destinationFrame = getNextNode(sourceFrame) as FrameNode;

    if(destinationFrame == null){

      return;
    }

    console.log("source:", sourceFrame.x, sourceFrame.y);
    console.log("destination:", destinationFrame.x, destinationFrame.y);

    // Calculate the differences in position, opacity, rotation, width, and height for each node
    const nodeProperties = new Map();

    //create temp frame
    const tempFrame = sourceFrame.clone();
    tempFrame.name = "Temp Frame";
    
    // Focus on the temp frame
    figma.currentPage.selection = [tempFrame];
    figma.viewport.scrollAndZoomIntoView([tempFrame]);
    
    
    tempFrame.children.forEach((node:any) => {
      // Find the corresponding node in the destination frame by name      
      const correspondingNode:any = destinationFrame.findOne((n:any) => n.name === node.name);
      if (correspondingNode) {
        // Calculate the delta for each property
        const dx = correspondingNode.x - node.x;
        const dy = correspondingNode.y - node.y;
        const dOpacity = correspondingNode.opacity - node.opacity;
        const dRotation = correspondingNode.rotation - node.rotation;
        const dWidth = correspondingNode.width - node.width;
        const dHeight = correspondingNode.height - node.height;

        // Store the deltas for each property
        nodeProperties.set(node.id, { dx, dy, dOpacity, dRotation, dWidth, dHeight });
      }
    });

    // Set the duration of the animation (in milliseconds)
    const animationDuration = 500; // Adjust as needed

    // Set the frames per second (fps)
    const fps = 120; // Adjust as needed

    // Calculate the number of steps for the animation
    const numSteps = fps * (animationDuration / 1000);

    // Duplicate the source frame


    // Create a timer to update the properties
    let stepCount = 0;
    const updateProperties = setInterval(async () => {
      const export_image_data = await exportFrameAsPNG(tempFrame, `${tempFrame.name}_${frame_start_id}_${stepCount}`,quality);
      emit("export-image", {export_image_data, uniqueSuffix});
      // Iterate over all nodes in the temp frame
      tempFrame.children.forEach((node:any) => {
        
        // Get the deltas for the current node
        const deltas = nodeProperties.get(node.id);        
        if (deltas) {
          // Calculate the new values for each property
          const newX = node.x + deltas.dx / numSteps;
          const newY = node.y + deltas.dy / numSteps;
          const newOpacity = node.opacity + deltas.dOpacity / numSteps;
          const newRotation = node.rotation + deltas.dRotation / numSteps;
          const newWidth = node.width + deltas.dWidth / numSteps;
          const newHeight = node.height + deltas.dHeight / numSteps;

          // Update the properties of the node
          node.x = newX;
          node.y = newY;
          node.opacity = newOpacity;
          node.rotation = newRotation;
          node.resize(newWidth, newHeight);

          console.log(newX, newY, newOpacity, newRotation, newWidth, newHeight, node.id);
        }
      });

      // Increment the step count
      stepCount++;

      // Check if the animation is complete
      if (stepCount > numSteps) {
        clearInterval(updateProperties); // Stop the timer
        console.log("Animation complete."); // Log a message when animation is complete

        // Delete the temp frame after a delay
          tempFrame.remove();
          console.log("Temp frame removed.");
          animateFrames(destinationFrame,`${parseInt(frame_start_id)+1}`,uniqueSuffix,frameRate,quality);

      }
    }, 1);
  }
