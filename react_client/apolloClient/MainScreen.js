import { FlatList, SafeAreaView, Text, View, StyleSheet, Button } from 'react-native';
import React, { useContext } from 'react';
import DataContext from './contexts/dataContext';

const MainScreen = () => {

    const { addUser, dataState } = useContext(DataContext);
    console.log(dataState);


    return (
        <SafeAreaView>
            <View style={styles.header}>
            <Text style={styles.headerText}> {`Welcome ${dataState.user?.name} !`}</Text>


            </View>

            <View style={styles.mainScreen}>
                <View style={styles.listView}>
                    <FlatList
                        data={dataState.users}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <Text>{item.name}</Text>

                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />

                </View>
            </View>
            <View style={styles.buttonView}>
                <Button title={"Add User"} onPress={()=>addUser({name:'HI',age:25,id:13})}>

                </Button>
            </View>



        </SafeAreaView>

    );

}
const styles = StyleSheet.create({
    mainScreen: {
        height: '80%',
        flexDirection: 'column',
        backgroundColor: "blue"

    },
    headerText:{

    },
    header:{
        height:'7%',
        justifyContent:'center',
        padding:2,
    },
    listItem: {
        padding: 10,
        marginBottom: 7

    },
    buttonView:{
        paddingTop:10,

    },
    listView: {
        padding: 10,
        flex: 3,
        backgroundColor: 'ghostwhite'
    }


});
export default MainScreen;