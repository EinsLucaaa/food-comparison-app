import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SearchResultCard = ({item, onAddPress}) => (
    <View style={styles.card}>
        <Image source={{uri: item.image_thumb_url}} style={styles.image}/>
        <View style={styles.details}>
            <Text style={styles.name}>{item.product_name}</Text>
            <Text>Energie: {item.nutriments.energy}kJ</Text>
            <Text>Menge: {item.quantity}</Text>
            <View style={styles.nutriScoreContainer}>
                <Image
                    source={{uri: `https://static.openfoodfacts.org/images/misc/nutriscore-${item.nutriscore_grade}.png`}}
                    style={styles.nutriScoreImage}/>
            </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => onAddPress(item)}>
            <Text style={styles.addButtonText}>Hinzufügen</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    quantity: {
        marginBottom: 5,
    },
    addButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    nutriScoreContainer: {
        marginTop: 10,
        alignItems: 'flex-start',
    },
    nutriScoreImage: {
        width: 80,
        height: 40,
    },
});

export default SearchResultCard;
