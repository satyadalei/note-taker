import React from "react";

interface SearchComponent {
  searchType?: string;
  searchText?: string;
  searchData?: [
    {
      id: string;
      title: string;
      body: string;
      tags: string[];
      createdAt: string;
      updatedAt: string;
    }
  ];
}

const SearchBar: React.FC<SearchComponent> = () => {
  return (
    <div>
      <label htmlFor=""></label>
      <input className="outline-none p-1 h-7 pl-2 rounded-sm"  type="text" placeholder="Search notes..." />
    </div>
  );
};

export default SearchBar;
