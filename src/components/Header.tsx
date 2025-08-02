import ThemeToggle from './ThemeToggle';

function Header() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center pb-2 mt-3 border-b-4 border-red-800">
      <div />
      <h1 className="text-3xl font-extrabold text-red-800 uppercase">
        PokeSearch
      </h1>
      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
