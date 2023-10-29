import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Not Found</h1>
      <Link to="/">GO HOME</Link>
    </>
  );
}

export default NotFound;

// import { FC, useEffect, useState } from 'react';
// import cityData from '../data/largest-cities.json';

// // async function fetchWeather() {
// //   const res = await fetch(
// //     'http://api.weatherstack.com/current?access_key=37b5c2cc99f19c202c8a91aefcde9802&query=New York'
// //   );
// //   const data = await res.json();
// //   console.log({ data });
// //   return data;
// // }

// interface ICityCard {
//   // city: string;
//   query: string;
// }

// interface ITempData {
//   current: { temperature: number };
// }

// async function fetchWeather(queryString: string): Promise<ITempData> {
//   const res = await fetch(
//     // `http://api.weatherstack.com/current?access_key=37b5c2cc99f19c202c8a91aefcde9802&query=New York`
//     `http://kapi.weatherstack.com/current?access_key=37b5c2cc99f19c202c8a91aefcde9802&query=${queryString}`
//   );
//   const data = await res.json();
//   console.log({ data });
//   return data;
// }

// // function CityCard({ city }: ICityCard) {
// function CityCard({ query }: ICityCard) {
//   const [city, setCity] = useState<ITempData | undefined>();

//   useEffect(() => {
//     // (async () => {
//     //   const data = await fetchWeather(query);
//     //   setCity(data);
//     // })();
//   }, [query]);

//   return (
//     <div
//       style={{
//         height: 100,
//         width: 100,
//         display: 'grid',
//         placeItems: 'center',
//         border: 'solid red',
//       }}
//     >
//       <p>{`city ${query}: Temperature ${city?.current?.temperature}`}</p>
//     </div>
//   );
// }

// function CityList() {
//   const fecthCityData = async () => {
//     const calls = cityData.map((city) => fetchWeather(city.city));

//     try {
//       const data = await Promise.all(calls);
//       console.log({ data });
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     fecthCityData();
//   }, []);
//   return (
//     <div style={{ display: 'flex', gap: 32, padding: 40, border: 'solid red' }}>
//       {cityData?.map((city) => (
//         <CityCard key={city.city} query={city.city} />
//       ))}
//     </div>
//   );
// }

// function Home() {
//   return (
//     <div>
//       <h1>Hello World</h1>
//       {/* <button type="button" onClick={fetchWeather}>
//         Fetch
//       </button> */}
//       <div>
//         <CityList />
//       </div>
//     </div>
//   );
// }

// export default Home;
