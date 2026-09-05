type BrandLogoProps = {
  compact?: boolean;
  showTagline?: boolean;
  inverse?: boolean;
  className?: string;
};

export default function BrandLogo({ compact = false, showTagline = false, inverse = false, className = "" }: BrandLogoProps) {
  const navy = inverse ? "#ffffff" : "#0B2D5B";
  const orange = "#F59E0B";

  return (
    <div className={`inline-flex min-w-0 items-center ${compact ? "gap-2" : "gap-2.5 sm:gap-3.5"} ${className}`} aria-label="eBookiee.store">
      <svg viewBox="0 0 120 92" className={compact ? "h-9 w-11 shrink-0" : "h-10 w-12 shrink-0 sm:h-14 sm:w-16"} role="img" aria-hidden="true">
        <path d="M13 27c15-4 31-3 44 9v34c-13-10-28-13-44-10V27Z" fill="#0B2D5B" />
        <path d="M60 37c10-15 25-24 46-27v48c-18-1-33 4-46 15V37Z" fill="#F97316" />
        <path d="M61 48c11-11 23-18 39-22v31c-15 1-27 6-39 16V48Z" fill="#FDBA4A" />
        <path d="M13 64c18-3 34 1 47 13 13-12 28-17 46-15v6c-18-1-33 5-46 17-13-12-28-17-47-14v-7Z" fill="#0B2D5B" />
        <path d="M60 37v40" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" opacity=".96" />
        <path d="m54 8 2.8 7.2L64 18l-7.2 2.8L54 28l-2.8-7.2L44 18l7.2-2.8L54 8Z" fill="#FDBA4A" />
      </svg>

      {!compact && (
        <div className="min-w-0 leading-none">
          <div className="whitespace-nowrap text-[1.05rem] font-bold tracking-[-.045em] min-[380px]:text-[1.18rem] sm:text-[1.55rem]" style={{ color: navy }}>
            eBookiee<span style={{ color: orange }}>.store</span>
          </div>
          {showTagline ? (
            <div className={`mt-1 hidden text-[8px] font-medium uppercase tracking-[.17em] min-[390px]:block sm:mt-1.5 sm:text-[9px] sm:tracking-[.23em] ${inverse ? "text-white/55" : "text-[#64748B]"}`}>
              Good books. Brighter you.
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
