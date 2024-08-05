import Search from "./components/Search/Search";
import Weather from "./components/weather/Weather";

function App() {
  
  return (
    <> 
    <div className=" w-screen h-screen flex items-center justify-center bg-slate-700">
     <div className="text-center m-12 w-4/5 max-w-2xl rounded-md min-h-96 p-4  bg-green-400 shadow-2xl ">
      <Weather />
     </div>

    </div>
    </>
  );
}

export default App;
