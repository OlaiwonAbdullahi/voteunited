import Featured from "./components/featured";

const Page = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto text-center p-10">
        <h2 className="text-4xl md:text-5xl font-mont font-bold text-primary font-mont dark:text-white mb-4">
          Vote Your Candidate
        </h2>
        <p className="text-lg text-slate-600 fontroboto dark:text-slate-400 max-w-2xl mx-auto">
          Cast your vote for the candidate you believe in shaping the future of
          our country.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Featured />
      </div>
    </div>
  );
};

export default Page;
