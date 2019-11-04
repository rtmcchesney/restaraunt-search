import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/resultsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = price => {
    return results.filter(result => {
      return result.price === price;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>Search for Food</Text>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <ScrollView>
        <ResultsList results={filterResultsByPrice("$")} title="$" />
        <ResultsList results={filterResultsByPrice("$$")} title="$$" />
        <ResultsList results={filterResultsByPrice("$$$")} title="$$$" />
        <ResultsList results={filterResultsByPrice("$$$$")} title="$$$$" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 40,
    fontSize: 48
  }
});

export default SearchScreen;
