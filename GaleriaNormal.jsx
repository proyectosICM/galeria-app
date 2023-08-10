import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, FlatList, ScrollView, Text } from "react-native";

const images = [
  { uri: "https://i.imgur.com/52DBcCg.jpg" },
  { uri: "https://i.imgur.com/7QZMRcV.jpg" },
  { uri: "https://i.imgur.com/8nBNvc1.jpg" },
  { uri: "https://i.imgur.com/7QZMRcV.jpg" },
  { uri: "https://i.imgur.com/sXFSen7.jpg" },
];

export default function GaleriaNormal() {
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);
  const [thumbnailsActiveIndex, setThumbnailsActiveIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Asigna el ref después de que el componente ha sido montado
    scrollViewRef.current.scrollTo({
      x: activeIndex * Dimensions.get("window").width,
      animated: true,
    });
  }, [activeIndex]);

  const renderImageItem = (image, index) => {
    return (
      <View key={index} style={styles.slide}>
        <Image source={{ uri: image.uri }} style={styles.image} resizeMode="contain" />
      </View>
    );
  };
  
  const handleThumbnailPress = (index) => {
    setActiveIndex(index);
    setShowThumbnails(false);
    ///scrollViewRef.current({ x: index * Dimensions.get("window").width });
  };

  const renderThumbnailItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handleThumbnailPress(index)}>
        <Image source={{ uri: item.uri }} style={styles.thumbnail} resizeMode="cover" />
      </TouchableOpacity>
    );
  };

  const toggleThumbnails = () => {
    setShowThumbnails(!showThumbnails);
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / Dimensions.get("window").width);
    setGalleryActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      {showThumbnails ? (
        <FlatList
          data={images}
          renderItem={renderThumbnailItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
        />
      ) : (
        <ScrollView
          ref={scrollViewRef}
          style={styles.wrapper}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={200}
        >
          {images.map((image, index) => renderImageItem(image, index))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.button} onPress={toggleThumbnails}>
        <Text style={styles.buttonText}>{showThumbnails ? "Ver galería" : "Ver miniaturas"}</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    marginTop: 60,
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 5,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});