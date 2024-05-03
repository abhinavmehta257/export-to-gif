import { Dropdown, DropdownOption } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useState } from "react";

export default function FrameRate() {
    const [value, setValue] = useState<string>('foo');
    const options: Array<DropdownOption> = [{
      value: 'foo'
    }, {
      value: 'bar'
    }, {
      value: 'baz'
    }, '-', {
      header: 'Header'
    }, {
      value: 'qux'
    }];
    function handleValueChange(newValue: string) {
        console.log(newValue);
        setValue(newValue);
    }
    return <Dropdown onValueChange={handleValueChange} options={options} value={value} variant="underline" />;
  }