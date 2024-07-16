import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import EntryCard from "../components/EntryCard";


const productsData = [
    {
        id: '1',
        name: 'Apfel',
        calories: 52,
        quantity: '1 Stück',
    },
    {
        id: '2',
        name: 'Banane',
        calories: 89,
        quantity: '1 Stück',
    },
    {
        id: '3',
        name: 'Orange',
        calories: 47,
        quantity: '1 Stück',
    },
    {
        id: '4',
        name: 'Kiwi',
        calories: 42,
        quantity: '1 Stück',
    },
];

export default function ComparisonScreen() {
    const {products: initialProducts} = useLocalSearchParams();
    const parsedProducts = initialProducts ? JSON.parse(initialProducts) : productsData;


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vergleich</Text>
            <FlatList
                data={sortByNutriScore(parsedProducts)}
                renderItem={({item}) => <EntryCard item={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
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
    flatListContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
});

function sortByNutriScore(products) {
    const nutriScoreMap = {
        'a': 1,
        'b': 2,
        'c': 3,
        'd': 4,
        'e': 5,
        'unknown': 6,
    };

    products.sort((a, b) => nutriScoreMap[a.nutriscore] - nutriScoreMap[b.nutriscore]);

    return products;
}
