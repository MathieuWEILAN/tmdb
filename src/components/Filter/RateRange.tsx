import { FilterContext } from "@/contexts/FilterContext";
import { useContext, useState } from "react";
import { Range } from "react-range";

const RateRange = () => {
  const [rangeValues, setRangeValues] = useState<any>([0, 10]);
  const { filteredRate } = useContext(FilterContext);

  const handleValues = (values: number[]) => {
    setRangeValues(values);
    filteredRate(values);
  };
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <span className="text-center w-full">Range rate</span>
      <Range
        step={1}
        min={0}
        max={10}
        values={rangeValues}
        onChange={handleValues}
        onFinalChange={handleValues}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              marginTop: "15px",
              height: "1px",
              width: "100%",
              backgroundColor: "#1022FF",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "10px",
              width: "10px",
              backgroundColor: "#1022FF",
              borderRadius: "50%",
            }}
          />
        )}
      />
    </div>
  );
};

export default RateRange;
