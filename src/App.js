import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  let [data, setData] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  let reseting = { amount: null, description: null };
  const onSubmit = (formData) => {
    console.log(formData);
    data.push(formData);
    setData([...data]);

    reset(reseting);
  };

  let plus = 0;
  let minus = 0;
  data.forEach((item) => {
    if (item.amount >= 0) {
      plus += +item.amount;
    } else {
      minus += +item.amount;
    }
  });

  return (
    <main className="min-h-screen main font-semibold flex p-5 flex-col items-center">
      <h1 className="font-semibold  text-3xl ">Expense Tracker By Maria</h1>
      <h1 className="font-semibold text-xl mt-7">CURRENT BALANCE</h1>
      <h1 className="text-4xl">${plus + minus}.00</h1>
      <div className="bg-white shadow-sm text-xl shadow-black items-center justify-evenly flex w-80 h-24 mt-5">
        <div>
          <h1>INCOME</h1>
          <p className="text-amber-600 text-xl ml-4">${plus}.00 </p>
        </div>
        <div
          style={{
            height: "60%",
            borderLeft: "1px solid gray",
          }}
        ></div>
        <div>
          <h1>EXPENSE</h1>
          <p className="text-blue-500 text-xl ml-4">&{+minus}.00</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg mt-7">TRANSACTION HISTORY</h1>
      </div>
      <div>
        <hr className="w-80 hr bg-black mt-3"></hr>
      </div>
      {data
        ? data.map((item, index) => {
            return (
              <div
                key={item._id}
                id={+item.amount > 0 ? "div" : "negDiv"}
                className={"flex w-80 bg-white mt-3 p-0"}
              >
                <button
                  id="btn"
                  onClick={() => {
                    data.splice(index, 1);
                    setData([...data]);
                  }}
                >
                  x
                </button>
                <div className="desc">{item.description}</div>
                <div className="money">{item.amount}</div>
              </div>
            );
          })
        : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-xl p-3 ml-12">Add New Transaction</h1>
        <div>
          <hr className="w-80 hr bg-black mt-3"></hr>
        </div>
        <div>
          <h1>Descripton</h1>
          <input
            placeholder="Detail of Transaction"
            {...register("description", { required: true })}
            className="w-80 mt-3 h-10 input"
          ></input>
        </div>
        <div>
          <h1>Transaction Amount</h1>
          <input
            type="number"
            placeholder="Dollar Value of Transaction"
            {...register("amount", { required: true })}
            className="w-80 mt-3 h-10 input"
          ></input>
        </div>
        <button className="w-80 bg-blue-500 mt-5 rounded-md h-10">
          Add Transaction
        </button>
      </form>
    </main>
  );
}

export default App;
