import "./App.css";
import { useEffect, useRef, useState } from "react";
import InvoiceCard from "./components/invoiceCard/InvoiceCard";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import logo from "./images/KS-Logo.png";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [input, setInput] = useState({ type: "", value: "" });
  const [filtered, setFiltered] = useState();

  const getInvoices = () => {
    fetch(
      "https://localhost:7057/api/Invoices/List?invoiceTypeCode=&categoryId=",
      {}
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        result.sort((a, b) =>
          a.categoryDescription.localeCompare(b.categoryDescription)
        );
        console.log(result);
        setInvoices(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const formHandler = (e) => {
    e.preventDefault();
    console.log(input);
    let temp;
    if (input.type == "invoiceTypeCode") {
      console.log("checking invoicetypecode");
      temp = invoices
        .filter((x) => x.invoiceTypeCode.toString().startsWith(input.value))
        .sort((a, b) =>
          a.categoryDescription.localeCompare(b.categoryDescription)
        );
      setFiltered(temp);
      setInput({ type: "", value: "" });
    } else if (input.type == "categoryId") {
      console.log("checking categoryId");
      temp = invoices
        .filter((x) =>
          (x.categoryId.toString() + "." + x.subCategoryId).startsWith(
            input.value
          )
        )
        .sort((a, b) =>
          a.categoryDescription.localeCompare(b.categoryDescription)
        );
      setFiltered(temp);
      setInput({ type: "", value: "" });
    } else {
      setFiltered();
    }
  };

  const onChangeHandler = (event) => {
    console.log(event.target.name, event.target.value);
    setInput({ type: event.target.name, value: event.target.value });
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="App">
      <div id="header">
        <img src={logo} alt="Keysys Logo" />
        <p>Software Engineer: Ross Beckham</p>
      </div>
      <div className="invoices-div">
        <div className="main-div">
          <h1 id="title">Invoice Options</h1>
          <div className="formDiv">
            <form id="searchForm" onSubmit={formHandler} action="">
              <div>
                <label htmlFor="invoiceTypeCode">Invoice Type Code</label>
                <input
                  name="invoiceTypeCode"
                  id="invoiceTypeCode"
                  type="text"
                  onChange={onChangeHandler}
                  onClick={() => {
                    document.getElementById("categoryId").value = "";
                  }}
                  placeholder="807"
                />
              </div>
              <p>OR</p>
              <div>
                <label htmlFor="categoryId">Category ID</label>
                <input
                  id="categoryId"
                  name="categoryId"
                  type="text"
                  onChange={onChangeHandler}
                  onClick={() => {
                    document.getElementById("invoiceTypeCode").value = "";
                  }}
                  placeholder="1.127"
                />
              </div>
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="invoicesDiv">
            {!filtered
              ? invoices.map((invoice, ind) => (
                  <div className="card-parent" key={`${ind}`}>
                    <InvoiceCard invoice={invoice} />
                  </div>
                ))
              : filtered.map((invoice, ind) => (
                  <div className="card-parent" key={`${ind}`}>
                    <InvoiceCard invoice={invoice} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
