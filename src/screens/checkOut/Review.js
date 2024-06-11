import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTFAMILY, SIZES, STYLES, height, width } from '../../constants'
import { Icon, IconType } from '../../components';

export default function Review() {
  const data = [
    { key: "Full Name", value: "John Doe" },
    { key: "Mobile Number", value: "+123-456-789" },
    { key: "State", value: "Dummy" },
    { key: "City", value: "Dummy" },
    { key: "Street Address", value: "XYZ Address" },
    { key: "Postal Code", value: "12345" },
  ]

  const renderItem = ({ item }) => (
    <View style={styles.rows}>
      <Text style={styles.infoTxt}>{item.key}</Text>
      <Text style={styles.infoTxt}>{item.value}</Text>
    </View>
  );


  return (
    <View style={STYLES.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <Text style={styles.heading}>Items (2)</Text>
        <TouchableOpacity>
          <Icon type={IconType.SimpleLineIcons} name={"arrow-right"} color={COLORS.black}/>
        </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <Text style={styles.heading}>
          Shipping Address
        </Text>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.container}
          />
        </View>

        <View style={styles.line} />
        <Text style={styles.heading}>
          Order Info
        </Text>
        <View style={styles.totalRow}>
          <Text style={styles.infoTxt}>
            Sub Total
          </Text>
          <Text style={styles.infoTxt}>
            $25.27
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.infoTxt}>
            Shipping Cost
          </Text>
          <Text style={styles.infoTxt}>
            $0.00
          </Text>
        </View>
        <View style={[styles.totalRow, { marginBottom: SIZES.twenty }]}>
          <Text style={[styles.infoTxt, { color: COLORS.black, fontSize: SIZES.twenty }]}>
            Total
          </Text>
          <Text style={[styles.infoTxt, { color: COLORS.black, fontSize: SIZES.twenty }]}>
            $25.27
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: width * .43,
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  txt: {
    color: COLORS.black,
    fontSize: SIZES.fifteen,
    fontWeight: "500",
    marginTop: 3
  },
  statusBox: {
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    borderWidth: 0.3,
    marginVertical: SIZES.fifteen,
    borderColor: COLORS.lightGray,
    opacity: 0.3
  },
  heading: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: SIZES.twenty,
    fontFamily: FONTFAMILY.Poppins
  },
  rows: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.fifteen
  },
  infoTxt: {
    color: COLORS.gray,
    fontSize: SIZES.fifteen,
  },
  ProductListRow: {
    flexDirection: "row",
    paddingVertical: SIZES.ten,
    borderBottomWidth: 1
  },
  img: {
    width: width * .22,
    height: height * .14,

    borderRadius: SIZES.five,
    resizeMode: "contain"
  },
  productText: {
    fontSize: SIZES.twenty - 3,
    color: COLORS.black,
    fontFamily: FONTFAMILY.Poppins,
    fontWeight: "500"
  },
  totalRow: {
    marginTop: SIZES.fifteen,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})