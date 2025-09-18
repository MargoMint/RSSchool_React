import hero from '../assets/hero.png';

const HeroImage = () => {
  return (
    <div className={'fixed bottom-0 right-0 z-0'}>
      <img src={hero} alt="Hero" className={'w-95 h-auto'} />
    </div>
  );
};

export default HeroImage;
