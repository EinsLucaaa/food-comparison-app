import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import EntryCard from "./components/EntryCard";

export default function HomeScreen() {
    const { products: initialProducts } = useLocalSearchParams();
    const [products, setProducts] = useState(initialProducts ? JSON.parse(initialProducts) : []);
    const router = useRouter();

    console.log(JSON.stringify(products));
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Produktvergleich</Text>
            <Button
                style={styles.searchButton}
                title="Produkt suchen"
                onPress={() =>
                    router.push({ pathname: '/search', params: { search: JSON.stringify(products) } })
                }
            />
            <FlatList
                data={products}
                renderItem={({ item }) => <EntryCard item={item} />} // EntryCard für jedes Produkt rendern
                keyExtractor={(item, index) => index.toString()}
            />
            {products.length > 0 && (
                <Button
                    title="Vergleichen"
                    onPress={() =>
                        router.push({ pathname: '/comparison', params: { products: JSON.stringify(products) } })
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    searchButton: {
        marginBottom: 20,
    },
});
