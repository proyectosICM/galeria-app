import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, FlatList, ScrollView, Text } from "react-native";
import GaleriaNormal from "./GaleriaNormal";
import GaleriaCorregida from "./GaleriaCorregida";

const images = [
  { uri: "https://i.imgur.com/52DBcCg.jpg" },
  { uri: "https://i.imgur.com/7QZMRcV.jpg" },
  { uri: "https://i.imgur.com/8nBNvc1.jpg" },
  { uri: "https://i.imgur.com/7QZMRcV.jpg" },
  { uri: "https://i.imgur.com/sXFSen7.jpg" },
];

export default function App() {


  return (
    <>
      <GaleriaCorregida />
    </>
  );
}
