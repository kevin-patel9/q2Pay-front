import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ViewComponent from "../components/ViewComponent";
import { useEffect, useState } from "react";
import axios from "axios";

const AllProduct = ({ navigation }) => {
const [productData, setProductData] = useState([]);
const [loader, setLoader] = useState(false);

const getAllProductData = async () => {
    setLoader(true);
    try {
        const response = await axios.get("https://dummyjson.com/products");
        setProductData(response?.data?.products);
    } catch (err) {
        console.log("Failed to get products");
    }
    setLoader(false);
};

useEffect(() => {
    getAllProductData();
}, []);

const TitleCroppedText = (text) => {
    let truncatedText = text;
        if (text.length > 18)
            truncatedText = text.substring(0, 18) + "...";
    
    return <Text>{truncatedText}</Text>;
};

const discountText = (originalPrice, discountPercentage) => {
    const discountAmount = (discountPercentage / 100) * originalPrice;

    return Math.round(originalPrice - discountAmount);
}

const singleProductScreen = (data) => {
    navigation.navigate("singleProduct", {
        data
    })
}

if (loader)
    return <Text style={styles.loaderText}>Fetching data...</Text>

return (
    <ViewComponent>
        <View>
            <Text style={styles.title}>Product</Text>
            <FlatList 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                data={productData}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => singleProductScreen(item)} 
                        style={styles.productContainer}>
                        <View>
                            <Image
                            style={{ height: 100, width: 100, borderRadius: 300 }}
                            source={{ uri: item.thumbnail }}
                            />
                        </View>
                        <View style={{ alignItems: "start", gap: 10 }}>
                            <Text style={{ textDecorationLine: "underline" }}>Product Details</Text>
                            <Text style={[styles.text, { textAlign: "center" }]}>
                                {TitleCroppedText(item.title)}
                            </Text>
                            <View style={styles.productDetail}>
                                <Text>New Price:</Text>
                                <Text style={{ textDecorationLine: "line-through" }}>
                                    ${item.price}
                                </Text>
                                <Text style={styles.text}>{" "}${discountText(item.price, item.discountPercentage)}</Text>
                            </View>
                            <View style={styles.productDetail}>
                                <Text>Rating: </Text>
                                <Text style={styles.text}>{item.rating}</Text>
                            </View>
                            <View style={styles.productDetail}>
                                <Text>Stock:</Text>
                                <Text style={styles.text}>{item.stock}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    </ViewComponent>
);
};

export default AllProduct;

const styles = StyleSheet.create({
title: { 
    paddingBottom: 20, 
    fontSize: 26, 
    fontWeight: "600" 
},
text: {
    fontWeight: "800",
    fontStyle: "italic",
},
productContainer: {
    borderWidth: 1,
    flexDirection: "row",
    height: 160,
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 28,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "white",
},
productDetail: { 
    flexDirection: "row", 
    gap: 2 
},
loaderText: {
    alignSelf: 'center', 
    fontWeight: "600", 
    fontSize: 30, 
    marginTop: 100
}
});
