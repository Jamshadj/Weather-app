import React, { useState } from "react";
import "./Weather.css";
import Search from "../../Assets/7xm2_1v9x_230103-removebg-preview.png";
import Humidity from "../../Assets/humidity.png";
import Wind from "../../Assets/wind.png";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";
// import MapboxAutocomplete from "react-mapbox-autocomplete";
import MapboxAutocomplete from "react-mapbox-autocomplete"

interface WeatherData {
  main?: {
    temp?: number;
  };
  name?: string;
  message?: string;
}

function Weather() {
  const [data, setData] = useState<WeatherData>({});
  const [search, setSearch] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const Searching = (e: string) => {
    setSearch(e);
  };

  const suggestionSelect = (result: any, lat: number, lng: number, text: string) => {
    Searching(text);
  };


  const GetWeather = () => {
    if (search.trim()) {
      setLoader(true);
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&&appid=528969fe0325ea5e1403d7b5efee4012`;

      fetch(URL)
        .then((response) => response.json())
        .then((weatherData: WeatherData) => {
          console.log(weatherData);
          setData(weatherData);
          setLoader(false);
        })
        .catch((err) => {
          console.error("error: " + err);
          setLoader(false);
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "Enter A Location Name",
        timer: 1800,
        customClass: {
          popup: "custom-popup-class",
        },
        width: "300px",
        heightAuto: false,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <div className="Wether-mail">
        <div className="OuterDiv">
          <div className="SearchBar">
            <MapboxAutocomplete
              publicKey={'pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag' as string}
              inputClass='form-control search'
              onSuggestionSelect={suggestionSelect}
              country='in'
              resetSearch={false}
            />
            <button type="button" className="button" onClick={GetWeather}>
              Search  
            </button>
          </div>
          {loader === true ? (
            <div className="wetherImage2">
              <Hourglass
                visible={loader}
                height={100}
                width={100}
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#ffff", "gray"]}
              />
            </div>
          ) : (
            <>
              <div className={data?.main?.temp ? "wetherImage" : "wetherImage1"}>
                <img src={data?.main?.temp ? Search : data?.main?.temp} alt="Not found" />
              </div>
              <div className="temp">
                {data?.main?.temp ? data?.main?.temp + "°C" : ""}
              </div>
              <div className="wetherPlace">
                <div className="celsius">
                  {data?.main?.temp ? data?.main?.temp + "°C" : ""}
                </div>
                <br />
                <h3>
                  {data?.name ? data?.name : data?.message ? data?.message : "Search a location to check weather status."}
                </h3>
              </div>
              <div className="footer">
                <div className="humidity">
                  {data?.main?.temp ? (
                    <>
                      <img src={Humidity} alt="" />
                      &nbsp;
                      <b style={{ fontSize: "40px" }}>{data?.main?.temp}</b> % <br /> Humidity
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className="wind">
                  {data?.main?.temp ? (
                    <>
                      <img src={Wind} alt="" />
                      &nbsp;
                      <b style={{ fontSize: "40px" }}>{data?.main?.temp}</b> km/h <br /> Wind Speed
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;
