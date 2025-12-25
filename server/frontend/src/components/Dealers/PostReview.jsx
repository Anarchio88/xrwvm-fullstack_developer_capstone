import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealer.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let review_url = root_url + `djangoapp/add_review`;
  let carmodels_url = root_url + `djangoapp/get_cars`;

  const postreview = async () => {
    let name = sessionStorage.getItem("userName");
    if (review === "" || model === undefined || date === "" || year === "") {
      alert("All fields are required");
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    const res = await fetch(review_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsoninput,
    });

    const json = await res.json();
    if (json.status === 200) {
      window.location.href = window.location.origin + "/dealer/" + id;
    }
  };

  const get_dealer = async () => {
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retObj = await res.json();
    if (retObj.status === 200) {
      let dealerObj = retObj.dealer;
      setDealer(dealerObj);
    }
  };

  const get_cars = async () => {
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retObj = await res.json();
    setCarmodels(retObj.CarModels);
  };

  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>
        <textarea
          id='review'
          cols='50'
          rows='7'
          placeholder="Write your review here..."
          onChange={(e) => setReview(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        ></textarea>
        <div style={{ marginBottom: '10px' }}>
          <label>Purchase Date: </label>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Car Make & Model: </label>
          <select
            name="cars"
            id="cars"
            onChange={(e) => setModel(e.target.value)}
            style={{ padding: '5px', marginLeft: '10px' }}
          >
            <option value="" selected disabled hidden>Choose Car Make and Model</option>
            {carmodels.map((carmodel, index) => (
              <option key={index} value={carmodel.CarMake + " " + carmodel.CarModel}>
                {carmodel.CarMake} {carmodel.CarModel}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Car Year: </label>
          <input
            type="number"
            onChange={(e) => setYear(e.target.value)}
            max={2023}
            min={2015}
            placeholder="2023"
            style={{ padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <button
          className='postreview'
          onClick={postreview}
          style={{
            backgroundColor: '#1a5276',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Post Review
        </button>
      </div>
    </div>
  );
};

export default PostReview;
