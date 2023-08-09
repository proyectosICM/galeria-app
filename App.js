import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const images = [
  { uri: "https://i.imgur.com/52DBcCg.jpg" },
  { uri: "https://i.imgur.com/7QZMRcV.jpg" },
  { uri: "https://i.imgur.com/8nBNvc1.jpg" },
  { uri: "https://i.imgur.com/7QZMRcV.jpg" },
  { uri: "https://i.imgur.com/sXFSen7.jpg" },
];

export default function App() {
  const renderImageItem = (image, index) => {
    return (
      <View key={index} style={styles.slide}>
        <Image source={{ uri: image.uri }} style={styles.image} resizeMode="contain" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} loop={false} showsPagination={false}>
        {images.map((image, index) => renderImageItem(image, index))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
