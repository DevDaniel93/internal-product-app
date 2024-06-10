
// import React, { useRef, useState } from 'react';
// import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
// import { COLORS, SIZES } from '../constants';

// const { width } = Dimensions.get('window');

// const BannerSlider = ({ images }) => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const flatListRef = useRef(null);

//     const handleScroll = (event) => {
//         const slideSize = event.nativeEvent.layoutMeasurement.width;
//         const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
//         setActiveIndex(index);
//     };

//     const renderItem = ({ item }) => (
//         <View style={styles.imageContainer}>
//             <Image source={{ uri: item }} style={styles.image} />
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 ref={flatListRef}
//                 data={images}
//                 renderItem={renderItem}
//                 horizontal
//                 pagingEnabled
//                 showsHorizontalScrollIndicator={false}
//                 onScroll={handleScroll}
//                 keyExtractor={(item, index) => index.toString()}
//             />
//             <View style={styles.pagination}>
//                 {images.map((_, index) => (
//                     <View
//                         key={index}
//                         style={[
//                             styles.dot,
//                             activeIndex === index ? styles.activeDot : styles.inactiveDot,
//                         ]}
//                     />
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginHorizontal: -SIZES.twenty,
//         justifyContent: "center",
//         backgroundColor: COLORS.golden
//     },
//     imageContainer: {
//         width: width * .8,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: SIZES.twenty,
//         borderRadius: SIZES.twenty
//     },
//     image: {
//         width: '100%',
//         borderRadius: SIZES.ten,
//         height: 200,
//         resizeMode: 'cover',
//     },
//     pagination: {
//         flexDirection: 'row',
//         alignSelf: 'center',
//         marginTop: SIZES.fifteen
//     },
//     dot: {
//         width: SIZES.twentyFive,
//         height: SIZES.five + 2,
//         borderRadius: 4,
//         marginHorizontal: 4,
//     },
//     activeDot: {
//         backgroundColor: COLORS.primary,
//     },
//     inactiveDot: {
//         backgroundColor: 'gray',
//     },
// });

// export default BannerSlider;
// components/ImageSlider.js
// components/ImageSlider.js
import React, { useRef, useState } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

const { width } = Dimensions.get('window');
const imageWidth = width * 0.8;

const BannerSlider = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
        setActiveIndex(index);
    };

    const renderItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={images || []}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                keyExtractor={(item, index) => index.toString()}
                snapToInterval={width} // This ensures each item snaps to the center
                decelerationRate="fast"
            />
            <View style={styles.pagination}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: -SIZES.twenty,
    },
    imageContainer: {
        width, // Full width of the screen
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.ten
    },
    image: {
        width: imageWidth,
        height: imageWidth * (2 / 3.5),
        resizeMode: 'cover',
        borderRadius: SIZES.ten
    },
    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: SIZES.fifteen
    },
    dot: {
        width: SIZES.twentyFive,
        height: SIZES.five + 2,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: COLORS.primary,
    },
    inactiveDot: {
        backgroundColor: COLORS.gray,
    },
});

export default BannerSlider;
