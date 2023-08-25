import { useRef } from "react";

import { useCsvToJson } from "./hooks/useCsv";
import { Table } from "./components/Table";

function App() {
  const inputFile = useRef<HTMLInputElement>(null);

  const { data, convert, isBusy, isLoaded } = useCsvToJson({
    Nombre: "name",
    "Correo Electronico": "email",
    Telefono: "phone",
  });

  const openFile = () => {
    inputFile.current?.click();
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [null];

    if (file) {
      convert(file)
    }
  };

  return (
    <div className="p-3 bg-slate-100 h-screen w-full">
      <div className="container m-auto ">
        <input type="file" 
          ref={inputFile} 
          onChange={handleOnChange} 
          className="hidden"
        />

        <div className="text-center py-14">
          <button onClick={openFile} disabled={isBusy} className="btn btn-primary">
            {isBusy ? "Loading CSV..." : "Upload CSV"}
          </button>
        </div> 

        <Table data={data} isLoading={isBusy} isLoaded={isLoaded} />
      </div>
    </div>
  )
}

export default App
