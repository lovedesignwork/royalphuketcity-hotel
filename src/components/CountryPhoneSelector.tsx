"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { getCountryCallingCode, isPossiblePhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const COUNTRIES: { code: Country; name: string }[] = [
  { code: "TH", name: "Thailand" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "ID", name: "Indonesia" },
  { code: "VN", name: "Vietnam" },
  { code: "PH", name: "Philippines" },
  { code: "IN", name: "India" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "RU", name: "Russia" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "NZ", name: "New Zealand" },
  { code: "HK", name: "Hong Kong" },
  { code: "TW", name: "Taiwan" },
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "EE", name: "Estonia" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "GE", name: "Georgia" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GT", name: "Guatemala" },
  { code: "HN", name: "Honduras" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "JM", name: "Jamaica" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KW", name: "Kuwait" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macau" },
  { code: "MV", name: "Maldives" },
  { code: "MT", name: "Malta" },
  { code: "MU", name: "Mauritius" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NI", name: "Nicaragua" },
  { code: "NG", name: "Nigeria" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PA", name: "Panama" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RS", name: "Serbia" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ZA", name: "South Africa" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TZ", name: "Tanzania" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VE", name: "Venezuela" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

interface CountryPhoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: Country;
  required?: boolean;
  id?: string;
}

export default function CountryPhoneSelector({
  value,
  onChange,
  defaultCountry = "TH",
  required = false,
  id = "phone",
}: CountryPhoneSelectorProps) {
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const lastEmittedValue = useRef<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value === lastEmittedValue.current) return;
    lastEmittedValue.current = value;
    if (value) {
      try {
        const parsed = parsePhoneNumber(value);
        if (parsed?.country) setCountry(parsed.country);
        setPhoneNumber(parsed?.nationalNumber || value);
      } catch {
        const dialCode = getCountryCallingCode(defaultCountry);
        if (value.startsWith(`+${dialCode}`)) {
          setPhoneNumber(value.slice(dialCode.length + 1));
        }
      }
    } else {
      setPhoneNumber("");
    }
  }, [value, defaultCountry]);

  useEffect(() => {
    phoneInputRef.current?.setCustomValidity(value && !isPossiblePhoneNumber(value) ? "Please enter a valid phone number." : "");
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buildFullNumber = useCallback(
    (countryCode: Country, phone: string): string => {
      if (!phone) return "";
      const parsed = parsePhoneNumber(phone, countryCode);
      if (parsed) return parsed.number;
      const dialCode = getCountryCallingCode(countryCode);
      const cleanPhone = phone.replace(/\D/g, "");
      return cleanPhone ? `+${dialCode}${cleanPhone}` : "";
    },
    []
  );

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPhone = e.target.value;
      setPhoneNumber(newPhone);
      const fullNumber = buildFullNumber(country, newPhone);
      lastEmittedValue.current = fullNumber;
      onChange(fullNumber);
    },
    [country, onChange, buildFullNumber]
  );

  const handleCountryChange = useCallback(
    (newCountry: Country) => {
      setCountry(newCountry);
      const fullNumber = buildFullNumber(newCountry, phoneNumber);
      lastEmittedValue.current = fullNumber;
      onChange(fullNumber);
      setIsOpen(false);
      setSearchQuery("");
    },
    [phoneNumber, onChange, buildFullNumber]
  );

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getCountryCallingCode(c.code).includes(searchQuery)
  );

  const FlagComponent = flags[country];

  return (
    <div className="flex w-full min-w-0 hairline-border bg-white focus-within:border-[--color-accent] transition-colors">
      {/* Country Code Selector */}
      <div className="relative" ref={dropdownRef} onKeyDown={(event) => { if (event.key === "Escape") { setIsOpen(false); dropdownRef.current?.querySelector("button")?.focus(); } }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Choose phone country code"
          aria-expanded={isOpen}
          className="flex items-center gap-2 px-3 py-3 hover:bg-gray-50 transition-colors min-w-[100px] justify-between border-r border-gray-200"
        >
          <span className="flex items-center gap-2">
            {FlagComponent && (
              <span className="w-5 h-4 flex-shrink-0 overflow-hidden rounded-sm">
                <FlagComponent title={country} />
              </span>
            )}
            <span className="text-sm text-gray-700">+{getCountryCallingCode(country)}</span>
          </span>
          <svg
            className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 z-50 max-h-[350px] w-[min(280px,calc(100vw-2rem))] overflow-hidden bg-white border border-gray-200 shadow-lg">
            {/* Search */}
            <div className="p-2 border-b border-gray-100">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search country..."
                aria-label="Search phone country"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                autoFocus
              />
            </div>

            {/* Country List */}
            <div className="max-h-[280px] overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">No country found.</div>
              ) : (
                filteredCountries.map((c) => {
                  const Flag = flags[c.code];
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => handleCountryChange(c.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left ${
                        country === c.code ? "bg-[#8B7355]/10" : ""
                      }`}
                    >
                      {Flag && (
                        <span className="w-5 h-4 flex-shrink-0 overflow-hidden rounded-sm">
                          <Flag title={c.name} />
                        </span>
                      )}
                      <span className="flex-1 text-sm">{c.name}</span>
                      <span className="text-xs text-gray-500">+{getCountryCallingCode(c.code)}</span>
                      {country === c.code && (
                        <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Phone Input */}
      <input
        id={id}
        ref={phoneInputRef}
        type="tel"
        name="phone"
        aria-label="Phone number"
        autoComplete="tel-national"
        maxLength={30}
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder="Phone number"
        required={required}
        className="min-w-0 flex-1 px-4 py-3 bg-transparent focus:outline-none"
      />
    </div>
  );
}
