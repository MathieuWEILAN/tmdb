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
    <>
      <span>RANGE RATE 0-10</span>
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
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
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
              height: "15px",
              width: "15px",
              backgroundColor: "#999",
              borderRadius: "50%",
            }}
          />
        )}
      />
    </>
  );
};

export default RateRange;
