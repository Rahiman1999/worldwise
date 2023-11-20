import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
function CountryList({ cities, isloading }) {
  if (isloading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a country on the map" />
    );
  const countries = cities.reduce(
    (arr, curr) => {
      if (!arr.map((el) => el.country).includes(curr.country))
        return [...arr, { country: curr.country, emoji: curr.emoji }];
      else return arr;
    },

    []
  );
  //   console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
