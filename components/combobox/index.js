import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function UniversalCombobox({
  data,
  initialValue,
  onSelect,
  ...props
}) {
  const [selected, setSelected] = useState(initialValue);
  const [query, setQuery] = useState("");

  const handleSelect = (value) => {
    setSelected(value);
    onSelect(value); // Call onSelect callback with the selected value
  };

  const filteredData =
    query === ""
      ? data
      : data.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md sm:text-sm">
            <Combobox.Input
              className="w-full border-2 border-transparent border-b-primary bg-transparent px-3 py-2 text-xl text-background text-secondary-300 outline-none duration-300 placeholder:text-secondary-300 focus:border-primary sm:text-xs"
              displayValue={(item) => item?.name}
              onChange={(event) => setQuery(event.target.value)}
              {...props}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 text-background">
              <ChevronDown />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-40 mt-3 max-h-60 w-full overflow-auto rounded-md bg-foreground py-1 text-base shadow-lg focus:outline-none sm:text-sm">
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ selected, active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 duration-200 ${
                        active ? "bg-primary text-white" : "text-background"
                      } ${selected && "bg-primary"}`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-background"
                            }`}
                          >
                            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
