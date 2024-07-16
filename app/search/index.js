import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, TextInput, View} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import SearchResultCard from "../components/SearchResultCard";
import Loader from "../components/Loader";

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {search: search} = useLocalSearchParams();
    console.log(search)
    const currentProductsList = search ? JSON.parse(search) : [];
    const router = useRouter();

    console.log(currentProductsList)
    const searchProducts = async () => {
        setIsLoading(true);
        const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&pageSize=5&page=1&json=1`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await response.json();
        console.log(json)

        setResults(json.products);
        setIsLoading(false);
    };


    const handleAddProduct = (product) => {
        const updatedProducts = [...currentProductsList, product];
        currentProductsList.push({
            name: product.product_name,
            id: product.id,
            image: product.image_thumb_url,
            nutriscore: product.nutriscore_grade,
            energy: product.nutriments.energy,
            quantity: product.quantity
        });
        router.push({pathname: '/', params: {products: JSON.stringify(currentProductsList)}});
    };

    if (isLoading) {
        return <Loader/>;
    } else {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Produkt suchen"
                    value={query}
                    onChangeText={setQuery}
                />
                <Button title="Suchen" onPress={searchProducts}/>
                <FlatList
                    data={results}
                    renderItem={({item}) => (
                        <SearchResultCard item={item} onAddPress={handleAddProduct}/>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
});
