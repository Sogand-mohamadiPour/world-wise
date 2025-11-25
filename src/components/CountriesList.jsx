import Spinner from "./Spinner";
import styles from "./CountriesList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";

export default function CountriesList({ cities, loading }) {
  if (loading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add yout first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
