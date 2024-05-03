import { Dropdown, DropdownOption } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useState } from "react";

export default function Flows({}) {
    const [value, setValue] = useState<string>('foo');
    const options: Array<DropdownOption> = [{
      value: 'foo'
    }, {
      value: 'bar',
      disabled: true,
    }, {
      value: 'baz'
    }];
    function handleValueChange(newValue: string) {
      console.log(newValue);
      setValue(newValue);
    }
    return <Dropdown class="w-[50px] block" onValueChange={handleValueChange} options={options} value={value} variant="border" />;
  }