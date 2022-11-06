import { Button, InputNumber, Select, Typography } from "antd";
import { useRef, useState } from "react";
import { Order, usePriceFilter } from "../../contexts/PriceFilterContext";

const { Text } = Typography;

const PriceFilter = () => {
  const { filter, setFilter } = usePriceFilter();
  const inputMin = useRef<any>();
  const inputMax = useRef<any>();
  const [selectValue, setSelectValue] = useState<Order>(filter.order);

  const handleApply = () => {
    setFilter({
      min: inputMin.current?.value,
      max: inputMax.current?.value,
      order: selectValue,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <Text>Filter</Text>
      <InputNumber
        ref={inputMin}
        style={{ width: 150, marginLeft: 10 }}
        placeholder="min"
        defaultValue={filter.min}
        addonAfter={<div>Matic</div>}
        step="0.001"
        stringMode
      />
      <InputNumber
        style={{ width: 150, marginLeft: 10 }}
        addonAfter={<div>Matic</div>}
        defaultValue={filter.max}
        placeholder="max"
        step="0.001"
        stringMode
      />
      <Select
        value={selectValue}
        onChange={setSelectValue}
        style={{ width: 150, marginLeft: 10 }}
        options={[
          {
            value: "asc",
            label: "Price low to high",
          },
          {
            value: "desc",
            label: "Price high to low",
          },
        ]}
      />
      <Button type="primary" style={{ marginLeft: 10 }} onClick={handleApply}>
        Apply
      </Button>
    </div>
  );
};

export default PriceFilter;
