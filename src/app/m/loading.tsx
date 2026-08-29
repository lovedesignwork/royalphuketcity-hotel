export default function MobileLoading() {
  return (
    <div
      className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]"
      aria-hidden="true"
    >
      <div className="h-4 w-36 rounded bg-[var(--m-border)]" />
      <div className="mt-4 h-24 rounded-[16px] bg-[var(--m-card)]" />
      <div className="mt-3 h-24 rounded-[16px] bg-[var(--m-card)]" />
      <div className="mt-3 h-24 rounded-[16px] bg-[var(--m-card)]" />
    </div>
  );
}
