import React from "react";
import { Image, View, Text, StyleSheet, Platform } from "react-native";
import { brandColors } from "../Theme/BrandColors";
export const getImageURL = (image) => {
  // Extract image ID and file name from the input URL
  if (image !== "") {
    const regexResult = image.match(/v1\/(.+)\//);
    if (!regexResult || regexResult.length < 2) {
      return <Text>Image URL format is invalid</Text>;
    }
    const imageId = regexResult[1];

    // Construct the desired image URL format
    const imageUrl = `https://static.wixstatic.com/media/${imageId}/v1/fill/w_340,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Image-place-holder.png`;
    return imageUrl;
  }
};

const YogaImage = ({ image, supressError = false, style }) => {
  // Example input URL: wix:image://v1/52dd53_ba2cfa4a6e394aa4a99089ed69fb49ca~mv2.png/boat%20pose%20with%20background%20(1080%20%C3%97%201080px)(1).png#originWidth=1910&originHeight=1910

  if (!image) {
    return supressError ? (
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 8,
          marginRight: 16,
          padding: 2,
          paddingTop: 12,
          backgroundColor: brandColors.secondary,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 10,
            color: brandColors.light,
          }}
        >
          Coming soon!
        </Text>
      </View>
    ) : (
      <Text>Image coming soon!</Text>
    );
  }

  const imageUrl = getImageURL(image);

  return (
    <Image
      source={{ uri: imageUrl }}
      style={[
        style,
        { resizeMode: Platform.OS === "ios" ? "cover" : "contain" },
      ]}
    />
  );
};

export { YogaImage };
