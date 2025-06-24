"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: { id: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({
  options,
  selectedValue,
  onSelect,
  placeholder = "Selecione uma opção",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.id === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getButtonClass = () => {
    const baseClass = "w-full px-3 py-2 text-sm rounded-md border flex items-center justify-between";
    const isSelected = selectedValue !== "all";
    
    if (isSelected) {
      return `${baseClass} bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-zinc-600`;
    }
    return `${baseClass} bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-gray-300 dark:border-zinc-600`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={getButtonClass()}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-600 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.id}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 ${
                selectedValue === option.id ? "bg-gray-100 dark:bg-zinc-800" : ""
              }`}
              onClick={() => {
                onSelect(option.id);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 