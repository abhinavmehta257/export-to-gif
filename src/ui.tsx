// src/ui.tsx
import {
  emit,
  on,
  // ...
} from '@create-figma-plugin/utilities'
import { render, Container, Text, VerticalSpace,Button } from '@create-figma-plugin/ui'
import { h } from 'preact'
import '!./output.css'
import Flows from './components/flows'
import FrameRate from './components/frameRate'
import Quality from './components/Quality'
import { useState } from 'react'

function Plugin (props: { greeting: string }) {
  const [flowList, setFlowList] = useState([]);
  function handleClick () {
    const data = { greeting: 'Hello, World!' }
    emit('SUBMIT', data);
  }
  on("flow-list",(data)=>{
    setFlowList(data);
  })
  return (
    <Container space='medium' class="flex justify-center">
      <VerticalSpace space='medium' />
      <div>
        <span class="font-bold">Select flow</span>
        <div class={"w-24"}>
          <Flows flowList={flowList}/>
        </div>
      </div>
      <VerticalSpace space='medium' />

      <div >
        <img class={"p-5 w-[300px]"} src="https://dummyimage.com/500x500/e861e8/0011ff" alt="" srcset="" />
      </div>
      <VerticalSpace space='medium' />
      <div class={"flex"}>
        <FrameRate/>
        <Quality/>
      </div>
      
      <VerticalSpace space='medium' />
      <div class="w-[100%]">
        <Button  onClick={handleClick} secondary>
          Export animation
        </Button>
      </div>
      
    </Container>
  )
}
 
export default render(Plugin)