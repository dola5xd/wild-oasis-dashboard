import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function Sorting({ Options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get("sort") || "name-asc";

  function handelChange(e) {
    searchParams.set("sort", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return <Select value={value} handelChange={handelChange} Options={Options} />;
}

export default Sorting;
