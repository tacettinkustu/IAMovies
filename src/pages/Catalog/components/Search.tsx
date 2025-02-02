/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GoSearch } from "react-icons/go";

interface SearchProps {
  setQuery: (val: URLSearchParams) => void;
}

const Search: React.FC<SearchProps> = ({ setQuery }) => {
  const [queryParams] = useSearchParams();
  const [search, setSearch] = useState<string>(queryParams.get("search") || "Pokemon");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    const newParams = new URLSearchParams(queryParams);
    newParams.set("search", search.trim());
    setQuery(newParams);
  };

  useEffect(() => {
    const searchParam = queryParams.get("search");
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [queryParams]);

  return (
    <form
      className="text-[14px] lg:py-10 md:pt-9 md:pb-5 sm:pt-8 sm:pb-10 pt-6 pb-2 flex flex-row items-center justify-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="py-[8px] pl-[20px] pr-[36px] rounded-full outline-none w-[300px] md:w-[340px] shadow-md transition-all duration-300 focus:shadow-sm text-[#666] focus:bg-[#ffffff] bg-[#fdfdfd] font-medium"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search"
      />
      <button
        type="submit"
        className="text-[18px] -ml-[32px] text-[#ff0000] z-[1]"
      >
        <GoSearch />
      </button>
    </form>
  );
};

export default Search;
