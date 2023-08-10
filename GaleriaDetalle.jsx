import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Text,
} from "react-native";

const images = [
  {
    uri: "https://i.imgur.com/52DBcCg.jpg",
    description: "Imagen 1",
    usuario: "Juan Paerse",
    rol: "Conductor",
  },
  {
    uri: "https://i.imgur.com/7QZMRcV.jpg",
    description: "Imagen 2",
    usuario: "Marco Siantes",
    rol: "Mecanico",
  },
  {
    uri: "https://i.imgur.com/8nBNvc1.jpg",
    description: "Imagen 3",
    usuario: "Juan Frunte",
    rol: "Conductor",
  },
  {
    uri: "https://i.imgur.com/7QZMRcV.jpg",
    description: "Imagen 4",
    usuario: "Jaime Suares",
    rol: "Conductor",
  },
  {
    uri: "https://i.imgur.com/sXFSen7.jpg",
    description: "Imagen 5",
    usuario: "Alex Opa",
    rol: "Mecanico",
  },
];

const numColumns = 3; // Number of columns in the gallery grid

export default function GaleriaDetalle() {
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

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handleThumbnailPress(index)}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderImageItem = (image, index) => {
    return (
      <View key={index} style={styles.slide}>
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.imageDescription}>{image.description}</Text>
        <Text style={styles.imageDescription}>{image.usuario}</Text>
        <Text style={styles.imageDescription}>{image.rol}</Text>
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
        <Image
          source={{ uri: item.uri }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
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
        <>
          <Text>sad</Text>
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
          />
        </>
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
        <Text style={styles.buttonText}>
          {showThumbnails ? "Ver galería" : "Ver miniaturas"}
        </Text>
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
    alignItems: "center",
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
    height: Dimensions.get("window").height - 200,
  },
  imageDescription: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
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
