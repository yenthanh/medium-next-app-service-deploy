"use client";

import {useProductContext} from "@/context/ProductContext";
import {MagnifyingGlassIcon, PhotoIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import React, {useRef, useState} from "react";

interface CategoryItem {
  category: string;
  suggestions: string[];
}

interface CategorizedSuggestedResponse {
  isSuccess: boolean;
  body: {
    categorizedSuggested: Record<string, string[]>;
  };
}

const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<CategoryItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const [imageOpen, setImageOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {setImageSearch} = useProductContext();

  const handleChooseImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSearch(reader.result as string);
        setImageOpen((prev) => !prev);
        router.push(`/search?keywords=image`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = async () => {
    try {
      router.push(`/search?keywords=${searchInput}`);
      setSuggestions([]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newInput = event.target.value;
    setSearchInput(newInput);
    setActiveIndex(-1);

    if (newInput.trim()) {
      try {
        const searchUrl = process.env.NEXT_PUBLIC_SEARCH_URL;

        if (!searchUrl) {
          throw new Error("NEXT_PUBLIC_APP_URL is not defined");
        }

        const response = await fetch(
          `${searchUrl}/${encodeURIComponent(newInput)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({numSuggestedSearches: 10}),
          },
        );

        const data: CategorizedSuggestedResponse = await response.json();

        if (data.isSuccess && data.body && data.body.categorizedSuggested) {
          const categorizedSuggested = data.body.categorizedSuggested;

          const allSuggestionsWithCategories: CategoryItem[] = Object.entries(
            categorizedSuggested,
          ).map(([category, suggestions]) => ({
            category,
            suggestions,
          }));
          setSuggestions(allSuggestionsWithCategories);
        } else {
          console.error("Failed to fetch suggested searches. Response:", data);
        }
      } catch (error) {
        console.error("Error fetching suggested searches:", error);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const allSuggestions = getAllSuggestions();
      if (activeIndex >= 0 && activeIndex < allSuggestions.length) {
        const suggestion = allSuggestions[activeIndex];
        setSearchInput(suggestion);
        router.push(`/search?keywords=${searchInput}`);
        setSuggestions([]);
      } else {
        handleSearch();
      }
    } else if (event.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % getAllSuggestions().length);
    } else if (event.key === "ArrowUp") {
      setActiveIndex(
        (prev) =>
          (prev - 1 + getAllSuggestions().length) % getAllSuggestions().length,
      );
    }
  };

  const getAllSuggestions = () => {
    return suggestions.flatMap((categoryItem) => categoryItem.suggestions);
  };

  const handleImageOpen = () => {
    setImageOpen((prev) => !prev);
  };

  return (
    <div className='relative z-[100000] flex items-center justify-center bg-[#d7d7d7] rounded-lg pr-5 border-transparent border-[3px] hover:border-gray-400 gap-2'>
      <div className=''>
        <input
          type='text'
          className='w-[550px] h-10 p-2 bg-transparent text-black rounded-md mr-2 transition-all focus:outline-none focus:border-none border-none ring-0 duration-300'
          placeholder='Ask a question or Search?'
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <ul className='suggestions-list absolute top-[110%] w-full bg-[#383b3d] shadow-xl'>
            {suggestions.map((categoryItem, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                {categoryItem.category.length > 0 && (
                  <li className='category-item bg-black text-white p-[10px] h-[50px] cursor-default'>
                    <span className='font-bold'>{categoryItem.category}</span>
                  </li>
                )}
                {categoryItem.suggestions.map((suggestion, index) => {
                  const globalIndex =
                    suggestions
                      .slice(0, categoryIndex)
                      .reduce((acc, item) => acc + item.suggestions.length, 0) +
                    index;
                  return (
                    <li
                      key={index}
                      className={`flex items-center p-[10px] h-[50px] suggestion-item cursor-pointer hover:bg-[#292c2d] text-white !text-[16px] border-b-[1px] border-b-[#89939b] ${
                        globalIndex === activeIndex ? "bg-[#292c2d]" : ""
                      }`}
                      onClick={() => {
                        setSearchInput(suggestion);
                        setSuggestions([]);
                        router.push(`/search?keywords=${suggestion}`);
                      }}
                    >
                      <span>{suggestion}</span>
                    </li>
                  );
                })}
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>

      <MagnifyingGlassIcon
        width={25}
        height={25}
        color='white'
        className='cursor-pointer'
        onClick={handleSearch}
      />
      <div className='relative'>
        <PhotoIcon
          width={25}
          height={25}
          color='white'
          className='cursor-pointer'
          onClick={handleImageOpen}
        />
        {imageOpen && (
          <div className='absolute bg-white p-4 shadow-md top-[40px] right-[-25px] rounded-sm w-[300px]'>
            <h3 className='text-lg font-semibold text-gray-800 text-center'>
              Try Visual Search
            </h3>
            <p className='text-sm text-gray-600 mt-1  text-center'>
              Search with a picture instead of text.
            </p>
            <button
              className='bg-gray-200 text-[#041521] w-full p-2 rounded-md mt-2'
              onClick={handleChooseImage}
            >
              <p>Choose a picture</p>
            </button>
            <input
              type='file'
              hidden
              ref={fileInputRef}
              accept='image/*'
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
