import './App.css';
import { useState } from "react";
function App() {
  const [result, setResult] = useState({});

  async function fetchData(val) {
    const searchtext = val.trim().toLowerCase();
    console.log(searchtext);
    if (searchtext.length > 0) {
      const apistring = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchtext}`;
        const response = await fetch(apistring);
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return await response.json();
    }
}
async function handleSearch(e) {
  const { value } = e.target;
  setResult({ result: await fetchData(value) })
  console.log(result)
}

  return (
    
    <div className="App">
    <input type="text" className="search" onKeyUp={handleSearch} />
   
    <ul>
    {result.result && result.result.query.search.map((data,i) =>{return(<div key={i}>{data.title}</div>)})}
 </ul>
    </div>
  );
}

export default App;
