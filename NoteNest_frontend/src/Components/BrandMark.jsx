const BrandMark = ({ className = "size-10" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    role="img"
    aria-label="NoteNest"
  >
    <rect width="48" height="48" rx="13" fill="#1b251e" />
    <path
      d="M14 12.5h11.5c4.7 0 8.5 3.8 8.5 8.5V34"
      fill="none"
      stroke="#fffdf8"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d="M14 20h8M14 26h6"
      fill="none"
      stroke="#a7c0a1"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M11.5 32.5c4.2 3.4 9.7 4.7 14.6 3.4 5-1.4 8.6-4.7 10.4-8.6"
      fill="none"
      stroke="#d27a52"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M13.5 36.2c5.8 2.3 13.6 1.8 19-1.6"
      fill="none"
      stroke="#fffdf8"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity=".4"
    />
  </svg>
);

export default BrandMark;
