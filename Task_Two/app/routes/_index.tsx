import { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { CogIcon } from '@heroicons/react/24/outline';

export default function Locations() {
  const [countryInput, setCountryInput] = useState({
    name: "", code: "", order: "", phLength: "", pinLength: "", isDefault: false
  });
  const [stateInput, setStateInput] = useState({ name: "", order: "", isDefault: false });
  const [cityInput, setCityInput] = useState({ name: "", order: "", pincode: "", isDefault: false });
  const [regionInput, setRegionInput] = useState({ name: "", order: "", pincode: "", isDefault: false });

  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);

  const [search, setSearch] = useState({ country: "", state: "", city: "", region: "" });

  const handleAdd = (type: string) => {
    if (type === "country" && countryInput.name) {
      setCountries([...countries, countryInput.name]);
      setCountryInput({ name: "", code: "", order: "", phLength: "", pinLength: "", isDefault: false });
    } else if (type === "state" && stateInput.name) {
      setStates([...states, stateInput.name]);
      setStateInput({ name: "", order: "", isDefault: false });
    } else if (type === "city" && cityInput.name) {
      setCities([...cities, cityInput.name]);
      setCityInput({ name: "", order: "", pincode: "", isDefault: false });
    } else if (type === "region" && regionInput.name) {
      setRegions([...regions, regionInput.name]);
      setRegionInput({ name: "", order: "", pincode: "440034", isDefault: false });
    }
  };

  const handleReset = (type: string) => {
    if (type === "country") setCountryInput({ name: "", code: "", order: "", phLength: "", pinLength: "", isDefault: false });
    else if (type === "state") setStateInput({ name: "", order: "", isDefault: false });
    else if (type === "city") setCityInput({ name: "", order: "", pincode: "", isDefault: false });
    else if (type === "region") setRegionInput({ name: "", order: "", pincode: "440034", isDefault: false });
  };

  const handleDelete = (type: string, index: number) => {
    if (type === "country") {
      setCountries(countries.filter((_, i) => i !== index));
    } else if (type === "state") {
      setStates(states.filter((_, i) => i !== index));
    } else if (type === "city") {
      setCities(cities.filter((_, i) => i !== index));
    } else if (type === "region") {
      setRegions(regions.filter((_, i) => i !== index));
    }
  };

  const renderList = (items: string[], searchTerm: string, type: string) => {
    return items
      .filter(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((item, idx) => (
        <li key={idx} className="cursor-pointer hover:bg-gray-100 py-2 px-2 border-b flex justify-between items-center">
          <span>{item}</span>
          <button
            className="text-black px-2 py-0.5 hover:bg-red-600 hover:text-white px-2"
            onClick={() => handleDelete(type, idx)}
          >
            X
          </button>
        </li>
      ));
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-4 w-full">
      {/* COUNTRY */}
      <div className="border rounded shadow-sm text-sm">
        <div className="text-sm flex justify-between font-bold text-white bg-gray-400 py-1.5 px-2">
          <div><h2>COUNTRY</h2></div>
          <div> <CogIcon className="h-6 w-6 text-gray-600" /></div>
        </div>
        <div className="">

          <div className="text-sm py-2">

            <table >
              <tr>
                <td className="px-2"><label> Country<br></br>
                  <input value={countryInput.name} onChange={e => setCountryInput({ ...countryInput, name: e.target.value })} placeholder="Country" className="w-[100px] border p-1" />
                </label></td>
                <td>  <label>Code<br></br>
                  <input value={countryInput.code} onChange={e => setCountryInput({ ...countryInput, code: e.target.value })} placeholder="Code" className="w-[40px] border p-1" />
                </label></td>

                <td className="px-2"><label>
                  Order
                  <br></br>
                  <input value={countryInput.order} onChange={e => setCountryInput({ ...countryInput, order: e.target.value })} placeholder="Order" className="w-[40px] border p-1" />
                </label></td>

                <td className="px-1"> <label>
                  Ph#Length<br></br>
                  <input value={countryInput.phLength} onChange={e => setCountryInput({ ...countryInput, phLength: e.target.value })} placeholder="Ph#Length" className="w-[70px] border p-1" />
                </label></td>

                <td className="">  <label>Pin Length
                  <br></br>
                  <input value={countryInput.pinLength} onChange={e => setCountryInput({ ...countryInput, pinLength: e.target.value })} placeholder="Pin Length" className="w-[70px] border p-1" />
                </label></td>
              </tr>
            </table>


          </div>

          <div className="flex justify-between mt-2 mb-2">
            <div>
              <label className="flex items-center px-2 space-x-2">
                <input className="h-4 w-4" type="checkbox" checked={countryInput.isDefault} onChange={e => setCountryInput({ ...countryInput, isDefault: e.target.checked })} />
                <span className="text-sm">Is Default</span>
              </label>
            </div>

            <div>
              <button onClick={() => handleAdd("country")} className="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
              <button onClick={() => handleReset("country")} className="bg-gray-300 mx-1 px-4 py-1 rounded">Reset</button>
            </div>
          </div>
        </div>

        <div className="px-3 py-2 bg-gray-100">
          <div className="relative">
            <input type="text" placeholder="Search Country" value={search.country} onChange={e => setSearch({ ...search, country: e.target.value })} className="text-sm w-full p-1 border" />
            <MagnifyingGlassIcon className="h-5 text-gray-400h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />

          </div>

        </div>
        <ul className="mt-2 max-h-screen overflow-y-auto">
          {renderList(countries, search.country, "country")}
        </ul>
      </div>

      {/* STATE */}
      <div className="border rounded text-sm">
        <div className="px-2 py-1 text-sm text-white bg-gray-400">
          <h2 className="font-bold px-1 py-1">STATE</h2>
        </div>

        <div className="px-2 py-1">
          <table>
            <tr >
              <td>
                <label className="text-sm"> State<br></br>
                  <input value={stateInput.name} onChange={e => setStateInput({ ...stateInput, name: e.target.value })} placeholder="State" className=" h-4 w-[240px] border p-1 py-3.5" />
                </label>
              </td>
              <td>
                <label className="text-sm mx-2"> Order<br></br>
                  <input value={stateInput.order} onChange={e => setStateInput({ ...stateInput, order: e.target.value })} placeholder="Order" className="h-4 mx-2 w-[100px] p-1 border py-3.5" />
                </label>
              </td>
            </tr>
          </table>
        </div>

        <div className="flex justify-between mt-3">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={stateInput.isDefault} onChange={e => setStateInput({ ...stateInput, isDefault: e.target.checked })} className="h-4 w-4 mx-2" />
            <span>Is Default</span>
          </label>
          <div className="flex space-x-2 mx-2">
            <button onClick={() => handleAdd("state")} className="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
            <button onClick={() => handleReset("state")} className="bg-gray-300 px-4 py-1 rounded">Reset</button>
          </div>
        </div>

        <div className="px-3 mt-3 my-2 py-2 bg-gray-100 text-sm">

          <div className="relative">
            <MagnifyingGlassIcon className="h-5 text-gray-400h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
            <input placeholder="Search State" value={search.state} onChange={e => setSearch({ ...search, state: e.target.value })} className="w-full p-1 border" />

          </div>
        </div>



        <ul className="mt-2 max-h-screen overflow-y-auto">
          {renderList(states, search.state, "state")}        </ul>
      </div>

      {/* CITY */}
      <div className="border rounded shadow-sm">

        <h2 className="text-sm font-bold text-white bg-gray-400 py-2 px-2">CITY</h2>

        <table className="text-sm mt-1 mx-2">
          <tr>
            <td>
              <label> City <br></br>
                <input value={cityInput.name} onChange={e => setCityInput({ ...cityInput, name: e.target.value })} placeholder="City" className="w-full  border p-1" />
              </label></td>

            <td>
              <label>Order<br></br>
                <input value={cityInput.order} onChange={e => setCityInput({ ...cityInput, order: e.target.value })} placeholder="Order" className="w-[70px] border p-1" /></label></td>

            <td><label>Pincode <br></br><input value={cityInput.pincode} onChange={e => setCityInput({ ...cityInput, pincode: e.target.value })} placeholder="Pincode" className="w-full border p-1" /></label></td>
          </tr>
        </table>

        <div className="flex justify-between mt-4 text-sm">

          <div>
            <label className="flex items-center mx-2 space-x-2">
              <input type="checkbox" checked={cityInput.isDefault} onChange={e => setCityInput({ ...cityInput, isDefault: e.target.checked })} className="h-4 w-4" />
              <span>Is Default</span>
            </label>
          </div>

          <div className="flex space-x-2 mx-2">
            <button onClick={() => handleAdd("city")} className="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
            <button onClick={() => handleReset("city")} className="bg-gray-300 px-4 py-1 rounded">Reset</button>
          </div>

        </div>

        <div className="px-3 mt-3 my-2 py-2 bg-gray-100 text-sm">

          <div className="relative">
            <MagnifyingGlassIcon className="h-5 text-gray-400h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
            <input placeholder="Search City" value={search.city} onChange={e => setSearch({ ...search, city: e.target.value })} className="w-full p-1 border" />

          </div>
        </div>

        <ul className="mt-2 max-h-screen overflow-y-auto">
          {renderList(cities, search.city, "city")}        </ul>
      </div>

      {/* REGION */}
      <div className="border rounded shadow-sm">
        <h2 className="text-sm font-bold text-white bg-gray-400 py-2 px-2">REGION</h2>

        <table className="text-sm mt-1 mx-2">
          <tr>
            <td>       <label> Region<br></br> <input value={regionInput.name} onChange={e => setRegionInput({ ...regionInput, name: e.target.value })} placeholder="Region" className="w-full border p-1" /></label>
            </td>

            <td>   <label> Order<br></br>      <input value={regionInput.order} onChange={e => setRegionInput({ ...regionInput, order: e.target.value })} placeholder="Order" className="w-full border p-1" /></label>
            </td>
            <td>    <label> Pin Code<br></br>     <input value={regionInput.pincode} onChange={e => setRegionInput({ ...regionInput, pincode: e.target.value })} placeholder="Pincode" className="w-full border p-1" /></label>
            </td>

          </tr>
        </table>

        <div className="flex justify-between mt-4 text-sm">
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={regionInput.isDefault} onChange={e => setRegionInput({ ...regionInput, isDefault: e.target.checked })} className="h-4 w-4 mx-2" />
              <span>Is Default</span>
            </label>
          </div>

          <div className="flex space-x-2 mx-2">
            <button onClick={() => handleAdd("region")} className="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
            <button onClick={() => handleReset("region")} className="bg-gray-300 px-4 py-1 rounded">Reset</button>
          </div>
        </div>
        <div className="px-3 mt-3 my-2 py-2 bg-gray-100 text-sm">

          <div className="relative">
            <MagnifyingGlassIcon className="h-5 text-gray-400h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
            <input placeholder="Search Region" value={search.region} onChange={e => setSearch({ ...search, region: e.target.value })} className="w-full p-1 border" />

          </div>

        </div>

        <ul className="mt-2 max-h-screen overflow-y-auto">
         {renderList(regions, search.region, "region")}
        </ul>

      </div>
    </div>
  );
}
