import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMAGES, SIZES, STYLES } from '../../constants'
import ProductCard from '../../components/ProductCard'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { label } from '../../constants/lables'

export default function WishList() {
    const products = [
        {
            productId: 1,
            title: "Casual T-Shirt",
            category: "Tops",

            price: 19.99,
            stockQuantity: 150,
            image: "https://static-01.daraz.pk/p/800a5ed023ea28339f3365e6b836625b.jpg_750x400.jpg_.webp",
            rating: 4.2,
            attributes: {
                color: ["Red", "Blue", "Green"],
                size: ["S", "M", "L", "XL"]
            }
        },
        {
            productId: 2,
            title: "Denim Jeans",
            category: "Bottoms",

            price: 49.99,
            stockQuantity: 200,
            image: "https://imgproxy.asket.com/e:1/width:1250/resize:fit/quality:85/aHR0cHM6Ly9kM212ZGhhb2wwNjJmeS5jbG91ZGZyb250Lm5ldC9kL2EvZi8yL2RhZjIxYTkyMjM2ZjY5MzYxZWYxYTgxZmIzODMxN2UyNmVkZmJiYjBfYXNrZXRfd2RqX21lX3NlYl9zbGlkZXNob3dfMDEuanBn.webp",
            rating: 4.5,
            attributes: {
                color: ["Blue", "Black", "Grey"],
                size: [28, 30, 32, 34]
            }
        },
        {
            productId: 3,
            title: "Leather Jacket",
            category: "Outerwear",

            price: 89.99,
            stockQuantity: 50,
            image: "https://www.mrporter.com/cms/ycm/resource/blob/1481748/1c5ad6b89f301edff400d6ba3c9030cb/mob-data.jpg",
            rating: 4.8,
            attributes: {
                color: ["Black", "Brown", "Tan"],
                size: ["M", "L", "XL", "XXL"]
            }
        },
        {
            productId: 4,
            title: "Summer Dress",
            category: "Dresses",

            price: 39.99,
            stockQuantity: 100,
            image: "https://www.parents.com/thmb/tNa-YQ94dPXWVA2UaX52r2MQbGc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/parents-update-brovave-womens-2023-summer-casual-boho-sundress-polka-dot-spaghetti-strap-tout-dcf8382ee3be4c29b6f37fdc129625bb.jpg",
            rating: 4.0,
            attributes: {
                color: ["Yellow", "Blue", "Pink"],
                size: ["S", "M", "L"]
            }
        },
        {
            productId: 5,
            title: "Running Shoes",
            category: "Footwear",

            price: 59.99,
            stockQuantity: 80,
            image: "https://hips.hearstapps.com/hmg-prod/images/run-nike-running-shoes-646cdd1a19c41.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*",
            rating: 4.6,
            attributes: {
                color: ["Black", "White", "Grey"],
                size: [8, 9, 10, 11]
            }
        },
        {
            productId: 6,
            title: "Baseball Cap",
            category: "Accessories",

            price: 15.99,
            stockQuantity: 300,
            image: "https://static-01.daraz.pk/p/ff6e39be6279aeb173cc0af03486af89.jpg_750x400.jpg_.webp",
            rating: 4.1,
            attributes: {
                color: ["Red", "Blue", "Black"],
                size: ["One Size"]
            }
        },
        {
            productId: 7,
            title: "Knit Scarf",
            category: "Accessories",

            price: 12.99,
            stockQuantity: 120,
            image: "https://cardigang.com.au/cdn/shop/articles/how-to-knit-a-scarf-1670487531441.jpg?v=1684127728&width=1324",
            rating: 4.3,
            attributes: {
                color: ["White", "Blue", "Black"],
                size: ["S", "M", "L", "XL"]
            }
        },
        {
            productId: 8,
            title: "Formal Shirt",
            category: "Tops",

            price: 29.99,
            stockQuantity: 90,
            image: "https://diners.com.pk/cdn/shop/files/AB23395NBLUERS3290-02.webp?v=1706273414",
            rating: 4.4,
            attributes: {
                color: ["White", "Blue", "Black"],
                size: ["S", "M", "L", "XL"]
            }
        },
        {
            productId: 9,
            title: "Cargo Shorts",
            category: "Bottoms",

            price: 34.99,
            stockQuantity: 60,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ59DuZol3A_4Fq9chSc1IcN3mya2Ffcvm3Hw&s",
            rating: 4.2,
            attributes: {
                color: ["Khaki", "Black", "Navy"],
                size: [30, 32, 34, 36]
            }
        },
        {
            productId: 10,
            title: "Winter Coat",
            category: "Outerwear",
            price: 99.99,
            stockQuantity: 30,
            image: "https://thedarkknot.com/cdn/shop/articles/PeaCoat.jpg?v=1485614004",
            rating: 4.7,
            attributes: {
                color: ["Navy", "Black", "Grey"],
                size: ["M", "L", "XL", "XXL"]
            }
        },

    ];
    return (
        <View style={[STYLES.container]}>
            <HeaderWithArrow label={label.Wishlist} />
            <FlatList
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    paddingHorizontal: 10
                }}
                showsVerticalScrollIndicator={false}
                data={products}
                keyExtractor={item => item.id}
                numColumns={"2"}
                renderItem={({ item }) => {
                    return (
                        <ProductCard item={item} />
                    )
                }}
                ListFooterComponent={()=>{
                    return(
                        <View style={{height:SIZES.fifty*1.5}}/>

                    )
                }}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({})