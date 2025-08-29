import HeroImage from './HeroImage';

function Spinner() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center gap-2">
      <HeroImage />
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-3 border-[var(--primary-dark)] border-t-transparent" />
        <span className="font-decor text-2xl">Loading data</span>
      </div>
    </div>
  );
}

export default Spinner;
