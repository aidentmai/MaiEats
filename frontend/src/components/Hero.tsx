import React from "react";
import { Link } from "react-router-dom";

interface HeroProps {
  onGetStartedClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStartedClick }) => {
  return (
    <div className="flex flex-col justify-center max-w-[1200px] md:h-[70vh] mx-auto py-8">
      <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600  inline-block font-bold">
        Savor Every Moment of Your Culinary Adventure
      </p>
      <p className="mb-8">
        Hungry for a taste of something new? Look no further! Welcome to
        MaiEats, your ultimate guide to discovering and creating delectable
        dining experiences.
      </p>
      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600  inline-block">
        Discover and Indulge
      </p>
      <p className="mb-8">
        Dive into a mouthwatering array of food spots with just a few taps. Our
        extensive database lets you explore a cornucopia of culinary delights,
        from cozy cafes to gourmet eateries and everything in between. Whatever
        your craving, satisfy it with ease as you uncover the hidden gems of the
        culinary world.
      </p>
      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600  inline-block">
        Save Your Flavorful Finds
      </p>
      <p className="mb-8">
        Keep track of the food spots that leave your taste buds tingling. With
        our "Favorites" feature, you can curate a personalized collection of
        must-visit eateries. Whether it's the perfect pizza joint or a charming
        brunch spot, organizing your favorites is simple.
      </p>
      <div className="flex justify-center mt-8">
        <Link to="/login">
          <button
            onClick={onGetStartedClick}
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Get Started Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
