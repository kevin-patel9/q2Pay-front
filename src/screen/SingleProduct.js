import ViewComponent from "../components/ViewComponent";
import { useState } from "react";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const SingleProduct = ({ navigation, route }) => {
const [product, setProduct] = useState(route.params.data);
const [toCart, setToCart] = useState(0);

const discountText = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice;

    return Math.round(originalPrice - discountAmount);
};

const handleIncrease = () => {
    setToCart((prev) => prev + 1);
};

const handleDecrease = () => {
    setToCart((prev) => prev - 1);
};

const totalStock = product.stock - toCart;

return (
    <ViewComponent>
        <Ionicons
            name="arrow-back-sharp"
            size={24}
            onPress={() => navigation.pop()}
            style={{ position: "absolute", left: 16, zIndex: 2 }}
        />
        <Text style={styles.title}>SingleProduct</Text>
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>{product.title}</Text>
                <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={styles.price}>Before Discount: </Text>
                    <Text style={[styles.price, { textDecorationLine: "line-through" }]}>
                        ${product.price}
                    </Text>
                    <Text style={styles.discount}>{product.discountPercentage}%</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={styles.price}>After Discount:</Text>
                    <Text style={[styles.price, { fontWeight: "800" }]}>
                        ${discountText(product.price, product.discountPercentage)}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={styles.price}>Stock:</Text>
                    <Text style={[styles.price, { fontWeight: "800" }]}>
                        {totalStock}
                    </Text>
                </View>
                <Text style={[styles.price, { fontWeight: 600, marginTop: 20 }]}>
                    Description:
                </Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
            <View style={styles.countContainer}>
                <AntDesign
                    name="delete"
                    size={20}
                    color="black"
                    disabled={toCart <= 0}
                    onPress={handleDecrease}
                />
                <Text>{toCart}</Text>
            </View>
            <TouchableOpacity
                onPress={handleIncrease}
                disabled={totalStock <= 0}
                style={{
                    backgroundColor: totalStock <= 0 ? "lightgrey" : "lightblue",
                    paddingVertical: 14,
                    borderRadius: 4,
                }}
            >
                <Text style={{ textAlign: "center", fontWeight: 600, color: "white" }}>Add to Cart</Text>
            </TouchableOpacity>
        </ScrollView>
    </ViewComponent>
);
};

export default SingleProduct;

const styles = StyleSheet.create({
container: {
    padding: 16,
},
title: {
    paddingBottom: 20,
    textAlign: "left",
    fontSize: 26,
    fontWeight: "600",
},
thumbnail: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    marginBottom: 16,
    borderRadius: 200,
    alignSelf: "center",
    marginVertical: 10,
},
title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
},
price: {
    fontSize: 16,
    marginBottom: 8,
},
discount: {
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 2,
    color: "green",
},
description: {
    fontSize: 16,
},
countBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
},
countContainer: {
    marginTop: 20,
    marginHorizontal: 90,
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 2,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 20,
},
});
