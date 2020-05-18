import React, {useState} from 'react';

const api = {
    key: '66ca9e61edd6c52bc4d161383d122496',
    base: 'http://api.openweathermap.org/data/2.5/'
};

const apiImage = {
    base: 'https://api.unsplash.com/photos/random?query=',
    key: '&client_id=3qtAN8MHYSjmLoDEf_nrCEwG7VgNAtoq2PtE0MENJkA',
};


function AppWeather() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [imageCountry, setImageCountry] = useState({});


    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(response => response.json())
                .then(data1 => {
                    setWeather(data1);
                    setQuery('');
                    console.log(data1);

                    return fetch(`${apiImage.base}{${query},${typeof data1.sys != "undefined" ? data1.sys.country : ""}}${apiImage.key}`)
                })
                .then(response => response.json())
                .then(data => {
                    setImageCountry(data);
                    setQuery('');
                    console.log(data)
                });
        }
    };
    const dateBuilder = (d) => {
        let months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
            'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
        let days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return (`${day} ${date} ${month} ${year}`)
    };

    return (
        <div className={typeof weather.main != "undefined" ? "app" : "app warm"}
             style={typeof imageCountry.links != "undefined" ? {backgroundImage: `url(${imageCountry.urls.regular})`}
                 : null}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className={"search-bar"}
                        placeholder={"Search city"}
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ?
                    <>
                        <div className="location-box">
                            <div className="location">
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div className="date">
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>

                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </>
                    : null}
            </main>
        </div>
    );
}

export default AppWeather;
