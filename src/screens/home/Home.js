import Header from "../../components/Layout/Header";
const Home = () => {
  return (
    <>
      <Header />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* <!-- Replace with your content --> */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg ">
              <div className="flex min-h-screen flex-col items-center justify-center">
                <div className="h-screen flex bg-gray-bg1">
                  <div className="w-full max-w-md m-auto bg-white shadow-default ">
                    <div className="text-xl font-medium text-primary text-center">
                      Supplier App Home Page
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </>
  );
};
export default Home;
