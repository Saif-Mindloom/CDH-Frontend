import { forwardRef, useState, useImperativeHandle } from "react";
import { ApiService } from "../services/api";
import type { User } from "../services/graphql/types";

interface ContentProps {
  title?: string;
  subtitle?: string;
  Label1?: string;
  Label1Placeholder?: string;
  Label2?: string;
  Label2Placeholder?: string;
  Label3?: string;
  Label3Placeholder?: string;
  Label4?: string;
  buttonText?: string;
  onSubmit?: (user: User) => void;
  phoneNumber?: string;
}

export interface FormDetailsRef {
  submitForm: () => void;
}

// Store locations data
const STORE_LOCATIONS = [
  "Select Store Location",
  "DLF Promenade - Vasant Kunj - Delhi",
  "DLF Avenue Mall - DLF Saket - Delhi",
  "Janpath - CP - Delhi",
  "Pacific Mall Tagore Garden - Subhash Nagar - Delhi",
  "Rcube Monad - Rajouri Garden - Delhi",
  "Aerocity Worlmark-3 - IGI Airport - Delhi",
  "Unity One Mall - Janakpuri - Delhi",
  "Vegas Mall - Dwarka - Delhi",
  "Khan Market - Khan Market - Delhi",
  "Pacific Mall NSP - NSP - Delhi",
  "Karol Bagh Amaryllis - Karol Bagh - Delhi",
  "Pacific Mall Jasola - Jasola - Delhi",
  "Pawa Grand - Rohini - Delhi",
  "Cross Point Gurgaon - DLF Phase 4 sec 28 - Gurugram",
  "Ambience Mall Gurgaon - NH-8 - Gurugram",
  "Cyber Hub Gurgaon - Cyber City - Gurugram",
  "Good Earth City Centre Gurgaon - Sector 50 - Gurugram",
  "DLF Cyber Park Gurgaon - Udhyog Vihar - Gurugram",
  "Ardee Mall Gurgaon - Sector 52 - Gurugram",
  "AIPL Joystreet - Sector 66 - Gurugram",
  "WorldMark-65 - Sector 65 - Gurugram",
  "M3M - Sector 65 - Gurugram",
  "Mall Of India Noida - Sector 18 - Noida",
  "Starling Mall Noida - Sector 104 - Noida",
  "Pebble Down Town Faridabad - Sector 12 - Faridabad",
  "Mall Of Faridabad - Faridabad",
  "MBD Mall - Ludhiana",
  "Paragon Water Front - Ludhiana",
  "Nexus Elante Mall - Chandigarh",
  "Raj Kamal Square - Patiala",
  "Ranjeet Avenue - Amritsar",
  "Riverside Mall - Lucknow",
  "Lullu Mall - Lucknow",
  "Phoenix Market City - Kurla Mumbai",
  "Inorbit Mall - Malad Mumbai",
  "Pacific Mall - Dehradun",
  "Inorbit Mall - Hyderabad",
  "Silver Square Mall - Srinagar",
  "Zora Mall - Raipur",
];

export const FormDetails = forwardRef<FormDetailsRef, ContentProps>(
  (
    {
      title = "Personal Details",
      subtitle = "Helps you avail discounts and offers!",
      Label1 = "Name",
      Label1Placeholder = "John Doe",
      Label2 = "Date of Birth",
      Label2Placeholder = "DD/MM/YYYY",
      Label3 = "Email (Optional)",
      Label3Placeholder = "john@example.com",
      Label4 = "Choose the Outlet",
      buttonText = "Proceed",
      onSubmit,
      phoneNumber,
    },
    ref
  ) => {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [storeLocation, setStoreLocation] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Convert date format from DD/MM/YYYY to YYYY-MM-DD
    const convertDateFormat = (dateStr: string): string => {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      }
      return dateStr;
    };

    // Validate date of birth
    const validateDOB = (
      dobString: string
    ): { isValid: boolean; message: string } => {
      if (!dobString || dobString.length !== 10) {
        return { isValid: false, message: "Please enter a complete date" };
      }

      const parts = dobString.split("/");
      if (parts.length !== 3) {
        return { isValid: false, message: "Invalid date format" };
      }

      const [day, month, year] = parts.map(Number);

      // Check individual component ranges
      if (day < 1 || day > 31) {
        return { isValid: false, message: "Day must be between 1 and 31" };
      }

      if (month < 1 || month > 12) {
        return { isValid: false, message: "Month must be between 1 and 12" };
      }

      if (year > new Date().getFullYear()) {
        return { isValid: false, message: "Year cannot be in the future" };
      }

      if (year < 1900) {
        return { isValid: false, message: "Please enter a valid year" };
      }

      // Create date object and validate (this catches invalid dates like 31st Feb)
      const date = new Date(year, month - 1, day);
      if (
        date.getDate() !== day ||
        date.getMonth() !== month - 1 ||
        date.getFullYear() !== year
      ) {
        return { isValid: false, message: "Please enter a valid date" };
      }

      return { isValid: true, message: "" };
    };

    // Handle DOB input with proper deletion support
    const handleDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const currentValue = dateOfBirth;

      // Handle deletion - if the new value is shorter, allow direct setting
      if (inputValue.length < currentValue.length) {
        // Remove slashes if they're at the end after deletion
        const cleanValue = inputValue.replace(/\/+$/, "");
        setDateOfBirth(cleanValue);
        setError(""); // Clear error when user is typing/deleting
        return;
      }

      // For additions, apply formatting
      let value = inputValue.replace(/\D/g, ""); // Remove non-digits

      // Limit to 8 digits (DDMMYYYY)
      if (value.length > 8) {
        value = value.substring(0, 8);
      }

      // Add slashes at appropriate positions
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
      }
      if (value.length >= 5) {
        value = value.substring(0, 5) + "/" + value.substring(5, 9);
      }

      setDateOfBirth(value);

      // Validate and show error if the date is complete but invalid
      if (value.length === 10) {
        const validation = validateDOB(value);
        if (!validation.isValid) {
          setError(validation.message);
        } else {
          setError("");
        }
      } else {
        setError(""); // Clear error when date is incomplete
      }
    };

    // Check if form is ready to submit
    const dobValidation = validateDOB(dateOfBirth);
    const isFormReady =
      name.trim().length > 0 &&
      dobValidation.isValid &&
      storeLocation !== "" &&
      storeLocation !== "Select Store Location" &&
      !loading;

    const handleSubmit = async () => {
      if (!phoneNumber) return;

      // Validate name
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }

      // Validate DOB
      const dobValidationResult = validateDOB(dateOfBirth);
      if (!dobValidationResult.isValid) {
        setError(dobValidationResult.message);
        return;
      }

      // Validate store location
      if (!storeLocation || storeLocation === "Select Store Location") {
        setError("Please select a store location");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const formattedDate = convertDateFormat(dateOfBirth);

        const userInput = {
          full_name: name.trim(),
          phone_number: phoneNumber,
          dob: formattedDate,
          email: email.trim() || undefined,
          // Note: store_location would need to be added to the backend schema
          // For now, we'll include it in a comment
          main_outlet: storeLocation,
        };

        const user = await ApiService.registerUser(userInput);
        // TODO: Handle store location separately if needed
        console.log("Selected store location:", storeLocation);
        onSubmit?.(user);
      } catch (err) {
        setError(ApiService.handleError(err));
      } finally {
        setLoading(false);
      }
    };

    // Filter store locations based on search term
    const filteredLocations = STORE_LOCATIONS.filter((location, index) => {
      if (index === 0) return true; // Always show the placeholder
      return location.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Handle store location selection
    const handleLocationSelect = (location: string) => {
      if (location !== "Select Store Location") {
        setStoreLocation(location);
        setSearchTerm(location);
        setIsDropdownOpen(false);
        setError("");
      }
    };

    // Handle input change for search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      setIsDropdownOpen(true);

      // If the search term exactly matches a location, select it
      const exactMatch = STORE_LOCATIONS.find(
        (location) => location.toLowerCase() === value.toLowerCase()
      );
      if (exactMatch && exactMatch !== "Select Store Location") {
        setStoreLocation(exactMatch);
      } else if (value === "") {
        setStoreLocation("");
      }

      setError("");
    };

    // Expose form methods and data to parent via ref
    useImperativeHandle(ref, () => ({
      submitForm: handleSubmit,
    }));

    return (
      <div
        style={{
          width: window.innerWidth <= 768 ? "90%" : "25%",
          maxWidth: window.innerWidth <= 768 ? "400px" : "none",
          borderRadius: window.innerWidth <= 768 ? 12 : 16,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: window.innerWidth <= 768 ? "32px 20px" : "40px 24px",
          boxSizing: "border-box",
          gap: window.innerWidth <= 768 ? 20 : 28,
          textAlign: "left",
          fontSize: window.innerWidth <= 768 ? 22 : 30,
          color: "#09090b",
          fontFamily: "Satoshi",
          fontWeight: 700,
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src="/CDH_Logo.webp"
          alt="Cafe Delhi Heights"
          style={{
            width: "75px",
            height: "75px",
            position: "absolute",
            top: "-50px",
          }}
        />

        {/* Heading */}
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: window.innerWidth <= 768 ? 6 : 10,
          }}
        >
          <b
            style={{
              letterSpacing: "-0.04em",
              fontSize: window.innerWidth <= 768 ? "22px" : "30px",
            }}
          >
            {title}
          </b>
          <div
            style={{
              alignSelf: "stretch",
              fontSize: window.innerWidth <= 768 ? 12 : 16,
              lineHeight: window.innerWidth <= 768 ? "20px" : "24px",
              fontWeight: 500,
              color: "#71717a",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              alignSelf: "stretch",
              padding: "12px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              color: "#dc2626",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {/* Inputs */}
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: window.innerWidth <= 768 ? 20 : 28,
            fontSize: window.innerWidth <= 768 ? 14 : 16,
          }}
        >
          {/* Name Input */}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  lineHeight: window.innerWidth <= 768 ? "20px" : "24px",
                  fontWeight: 600,
                  fontSize: window.innerWidth <= 768 ? "12px" : "16px",
                }}
              >
                {Label1}
              </div>
            </div>
            <div
              style={{
                alignSelf: "stretch",
                borderRadius: window.innerWidth <= 768 ? 6 : 8,
                backgroundColor: "#fff",
                border: "1px solid #e4e4e7",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: window.innerWidth <= 768 ? 16 : 20,
                color: "#71717a",
              }}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder={Label1Placeholder}
                disabled={loading}
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: window.innerWidth <= 768 ? 12 : 16,
                  color: "#09090b",
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </div>

          {/* DOB Input */}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  lineHeight: window.innerWidth <= 768 ? "20px" : "24px",
                  fontWeight: 600,
                  fontSize: window.innerWidth <= 768 ? "12px" : "16px",
                }}
              >
                {Label2}
              </div>
            </div>
            <div
              style={{
                alignSelf: "stretch",
                borderRadius: window.innerWidth <= 768 ? 6 : 8,
                backgroundColor: "#fff",
                border: "1px solid #e4e4e7",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: window.innerWidth <= 768 ? 16 : 20,
                color: "#71717a",
              }}
            >
              <input
                type="text"
                value={dateOfBirth}
                onChange={handleDOBChange}
                placeholder={Label2Placeholder}
                maxLength={10}
                disabled={loading}
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: window.innerWidth <= 768 ? 12 : 16,
                  color: "#09090b",
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </div>

          {/* Email Input */}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  lineHeight: window.innerWidth <= 768 ? "20px" : "24px",
                  fontWeight: 600,
                  fontSize: window.innerWidth <= 768 ? "12px" : "16px",
                }}
              >
                {Label3}
              </div>
            </div>
            <div
              style={{
                alignSelf: "stretch",
                borderRadius: window.innerWidth <= 768 ? 6 : 8,
                backgroundColor: "#fff",
                border: "1px solid #e4e4e7",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: window.innerWidth <= 768 ? 16 : 20,
                color: "#71717a",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder={Label3Placeholder}
                disabled={loading}
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: window.innerWidth <= 768 ? 12 : 16,
                  color: "#09090b",
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </div>

          {/* Store Location Dropdown */}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              // alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  lineHeight: window.innerWidth <= 768 ? "20px" : "24px",
                  fontWeight: 600,
                  fontSize: window.innerWidth <= 768 ? "12px" : "16px",
                }}
              >
                {Label4}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  alignSelf: "stretch",
                  borderRadius: window.innerWidth <= 768 ? 6 : 8,
                  backgroundColor: "#fff",
                  border: "1px solid #e4e4e7",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: window.innerWidth <= 768 ? 16 : 20,
                  color: "#71717a",
                  // width: "100%",
                }}
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => {
                    // Delay closing to allow for option clicks
                    setTimeout(() => setIsDropdownOpen(false), 150);
                  }}
                  placeholder={storeLocation || "Search and select outlet..."}
                  disabled={loading}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    fontSize: window.innerWidth <= 768 ? 12 : 16,
                    color: "#09090b",
                    backgroundColor: "#fff",
                  }}
                />
                <div
                  style={{
                    marginLeft: "8px",
                    color: "#71717a",
                    fontSize: window.innerWidth <= 768 ? 12 : 16,
                    cursor: "pointer",
                    transform: isDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  ▼
                </div>
              </div>

              {isDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "#fff",
                    border: "1px solid #e4e4e7",
                    borderRadius: window.innerWidth <= 768 ? 6 : 8,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    zIndex: 10,
                    maxHeight: "200px",
                    overflowY: "auto",
                    marginTop: "2px",
                    width: "100%",
                  }}
                >
                  {filteredLocations.length > 1 ? (
                    filteredLocations.slice(1).map((location, index) => (
                      <div
                        key={index}
                        onClick={() => handleLocationSelect(location)}
                        style={{
                          padding:
                            window.innerWidth <= 768
                              ? "12px 16px"
                              : "16px 20px",
                          cursor: "pointer",
                          fontSize: window.innerWidth <= 768 ? 12 : 14,
                          color: "#09090b",
                          borderBottom:
                            index < filteredLocations.length - 2
                              ? "1px solid #f4f4f5"
                              : "none",
                          backgroundColor: "transparent",
                          transition: "background-color 0.1s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#f9f9f9";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        {location}
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        padding:
                          window.innerWidth <= 768 ? "12px 16px" : "16px 20px",
                        fontSize: window.innerWidth <= 768 ? 12 : 14,
                        color: "#71717a",
                        textAlign: "center",
                      }}
                    >
                      No outlets found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div
            style={{
              alignSelf: "stretch",
              borderRadius: window.innerWidth <= 768 ? 6 : 8,
              backgroundColor: isFormReady ? "#FDCF3E" : "#9ca3af",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: window.innerWidth <= 768 ? "16px 12px" : "20px 16px",
              color: isFormReady ? "#B52354" : "#71717a",
              cursor: isFormReady ? "pointer" : "not-allowed",
              fontWeight: 600,
              fontSize: window.innerWidth <= 768 ? "12px" : "16px",
              opacity: isFormReady ? 1 : 0.6,
            }}
            onClick={handleSubmit}
          >
            {loading ? "Creating Account..." : buttonText}
          </div>
        </div>
      </div>
    );
  }
);

export default FormDetails;
