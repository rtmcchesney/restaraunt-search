import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView
} from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.textTitle}>{result.name}</Text>
      <Text style={styles.text}>{result.phone}</Text>
      <Text style={styles.text}>{result.location.display_address}</Text>

      <ScrollView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={result.photos}
          keyExtractor={photo => photo}
          renderItem={({ item }) => {
            return <Image style={styles.image} source={{ uri: item }} />;
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 180,
    width: 350,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 4,
    marginRight: 10
  },
  textTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold"
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10
  }
});

export default ResultsShowScreen;
