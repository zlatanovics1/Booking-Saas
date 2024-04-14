import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortParam = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      onChange={handleChange}
      type="white"
      value={currentSortParam}
      options={options}
    />
  );
}

export default SortBy;
