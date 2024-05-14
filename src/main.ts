import { emit, on, once, showUI } from '@create-figma-plugin/utilities';
import axios from 'axios';
import animateFrames from './helpers/animate';
import exportFrameAsPNG from './helpers/export';

export default function () {
  const options = { width: 350, height: 350 };
  let flowList:any[];
  let frameRate="30";
  let quality="1";
  let selectedNodeId:string;
  let currentNode:FrameNode;
  showUI(options);
  once("get-flowList",() => {
      console.log("Submission received");
      emit("flow-list",figma.currentPage.flowStartingPoints);
      flowList = figma.currentPage.flowStartingPoints as any;
      console.log(flowList);
      
    });
  on("flow-selected", async(selectedNodeName)=>{
    selectedNodeId = flowList.filter(node => node.name == selectedNodeName)[0].nodeId;
    const selectedNode =  figma.currentPage.findOne(node => node.id == selectedNodeId) as FrameNode;
    const reaction = selectedNode?.reactions[0];
    console.log("reaction",reaction);
    // emit("flow-image",)
    currentNode = selectedNode as FrameNode ;
    const exported_data = await exportFrameAsPNG(currentNode,"test",quality);
    emit("preview-image",exported_data)
  })
  on("play-preview",()=>{
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    animateFrames(currentNode,"1",uniqueSuffix,frameRate,quality);
  })
  on("set-frame-rate",(rate)=>{

  });
  on("set-quality",(rate)=>{
    
  })
}


interface ReactionObject {
  type: string;
  destinationId: string;
  navigation: string;
  transition: {
    type: string;
    easing: {
      type: string;
    };
    duration: number;
  };
  resetVideoPosition: boolean;
}
