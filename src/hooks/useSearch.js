import { useState } from "react";

export function useSearch(data) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value.toLowerCase());
  };

  const filteredData =
    searchKeyword === ""
      ? data
      : data?.filter((row) =>
          Object.values(row).some((value) =>
            value?.toString().toLowerCase().includes(searchKeyword),
          ),
        );

  return {
    searchKeyword,
    handleSearch,
    filteredData,
    setSearchKeyword,
  };
}
