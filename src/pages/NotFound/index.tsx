import img from "../../assets/svg/not-found.svg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-mainColor">
      <div className="flex flex-col gap-3 items-center font-robotoCondensed text-center">
        <img
          src={img}
          alt="not found"
          className="lg:max-h-[370px] xs:max-h-[270px] max-h-[180px] w-full"
        />
        <h3 className="sm:text-3xl xs:text-2xl text-xl mt-2 text-gray-900 font-bold">
          Oops! This page took a day off 🏖️
        </h3>
        <p className="sm:text-[16.75px] text-[14px] text-gray-800">
          We looked everywhere... even under the couch. 🛋️ No luck! 
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg text-lg font-medium hover:bg-blue-600 transition-all duration-300 ease-in-out animate-bounce"
        >
          Take me home 🏠
        </button>
      </div>
    </div>
  );
};

export default NotFound;

