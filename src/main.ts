import { emit, on, showUI } from '@create-figma-plugin/utilities';

export default function () {
  const options = { width: 350, height: 350 };
  const data = { greeting: 'Hello, World!' };
  showUI(options, data);
  on("SUBMIT",() => {
      console.log("Submission received");
      emit("flow-list",figma.currentPage.flowStartingPoints);
    });
}