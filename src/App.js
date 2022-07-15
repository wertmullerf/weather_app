import { useEffect, useState } from "react";

function App() {
	const [data, setData] = useState({});
	const [location, setLocation] = useState("");
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9a0a6601972c163a37ef83bf19b4769a`;
	const searchLocation = (e) => {
		if (e.key === "Enter") {
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					setData(data);
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return (
		<div className="app">
			<div className="search">
				<input
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					onKeyPress={searchLocation}
					placeholder="Search for a city"
				/>
			</div>
			{data.main !== undefined ? (
				<div className="container">
					<div className="top">
						<div className="location">
							<p>{data.name}</p>
						</div>
						<div className="temp">
							{data.main ? <h1>{data.main.temp}°F</h1> : null}
						</div>
						<div className="description">
							{data.weather ? (
								<p>{data.weather[0].main}</p>
							) : null}
						</div>
					</div>
					{data.name !== undefined && (
						<div className="bottom">
							<div className="feels">
								{data.main ? (
									<p className="bold">
										{data.main.feels_like}°F
									</p>
								) : null}

								<p>Feels Like</p>
							</div>
							<div className="humidity">
								{data.main ? (
									<p className="bold">
										{data.main.humidity}%
									</p>
								) : null}
								<p>Humidity</p>
							</div>
							<div className="winds">
								{data.main ? (
									<p className="bold">
										{data.wind.speed} MPH
									</p>
								) : null}
								<p>Wind Speed</p>
							</div>
						</div>
					)}
				</div>
			) : (
				<h1 className="error">That place does not exist.</h1>
			)}
		</div>
	);
}

export default App;
