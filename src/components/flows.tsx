import { useState } from 'react';
import { computeSiblingNodes, emit, on } from '@create-figma-plugin/utilities';
import { Dropdown, DropdownOption } from '@create-figma-plugin/ui';
import { h } from 'preact';

export default function Flows() {
  // Emit the "get-flowList" message to request flow list data
  emit('get-flowList');

  // State to manage the selected value of the dropdown
  const [value, setValue] = useState<null | string>(null);

  // Define the options for the dropdown
  const [options, setOptions] = useState<DropdownOption[]>([]);

  // Function to handle value change in the dropdown
  function handleValueChange(newValue: string) {
    console.log(newValue);
    emit("flow-selected",newValue);
    setValue(newValue);
  }

  // Listen for messages from the UI
  on('flow-list', (flowList: any) => {
    console.log('Received flow list:', flowList);
    // Update dropdown options with the received flow list data
    const dropdownOptions = flowList.map((flow: any) => ({
      value: flow.name,
      disabled: false // Adjust as needed
    }));
    setOptions(dropdownOptions);
    setValue(dropdownOptions[0].value);
    emit("flow-selected",dropdownOptions[0].value);
  });

  // Render the dropdown component
  return (
    <Dropdown
      class="w-[50px] block"
      onValueChange={handleValueChange}
      options={options}
      value={value}
      variant="border"
    />
  );
}
