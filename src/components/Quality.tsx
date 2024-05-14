import { Dropdown, DropdownOption } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useState } from "react";

export default function Quality() {
    const [value, setValue] = useState<string>('1X');
    const options: Array<DropdownOption> = [{
      value: '1X'
    }, {
      value: '2X'
    }, {
      value: '3X'
    }];
    function handleValueChange(newValue: string) {
        console.log(newValue);
        setValue(newValue);
    }
    return <Dropdown onValueChange={handleValueChange} options={options} value={value} variant="underline" />;
  }