import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const EntryCard = ({item}) => (
    <View style={styles.card}>
        <Image source={{uri: item.image}} style={styles.image}/>
        <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Energie: {item.energy}kJ</Text>
            <Text>Menge: {item.quantity}</Text>
            <View style={styles.nutriScoreContainer}>
                <Image source={{uri: `https://static.openfoodfacts.org/images/misc/nutriscore-${item.nutriscore}.png`}}
                       style={styles.nutriScoreImage}/>
            </View>
        </View>
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
    nutriScoreContainer: {
        marginTop: 5,
        alignItems: 'flex-start',
    },
    nutriScoreImage: {
        width: 80,
        height: 40,
    },
});

export default EntryCard;
