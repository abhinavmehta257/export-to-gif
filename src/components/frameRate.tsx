import { Dropdown, DropdownOption } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useState } from "react";

export default function FrameRate() {
    const [value, setValue] = useState<string>('30');
    const options: Array<DropdownOption> = [{
      value: '30'
    }, {
      value: '60'
    }, {
      value: '120'
    }];
    function handleValueChange(newValue: string) {
        console.log(newValue);
        setValue(newValue);
    }
    return <Dropdown onValueChange={handleValueChange} options={options} value={value} variant="underline" />;
  }