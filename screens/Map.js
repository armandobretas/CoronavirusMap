import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import axios from "axios";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from "expo-ads-admob";

export default class Map extends React.Component {
  state = {
    dados: [],
    kpi: []
  };

  componentDidMount = async () => {
    const response = await axios.get(
      `https://agendamento.gazin.com.br/dados_covid19.php?dados=geral`
    );
    this.setState({ dados: response.data });
    const response2 = await axios.get(
      `https://agendamento.gazin.com.br/dados_covid19.php?dados=kpi`
    );
    this.setState({ kpi: response2.data[0] });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.kpi}>
            <Text style={styles.confirmed}>
              CONFIRMED: {this.state.kpi.confirmed}
            </Text>
          </View>
          <View style={styles.kpi}>
            <Text style={styles.death}>DEATH: {this.state.kpi.death}</Text>
          </View>
          <View style={styles.kpi}>
            <Text style={styles.recovered}>
              RECOVERED: {this.state.kpi.recovered}
            </Text>
          </View>
        </View>
        <MapView style={styles.mapStyle}>
          {this.state.dados.length > 0 &&
            this.state.dados.map(i => (
              <MapView.Marker
                key={parseInt(i.id)}
                coordinate={{
                  latitude: parseFloat(i.latitude),
                  longitude: parseFloat(i.longitude)
                }}
                image={require(`../assets/marker.png`)}
                title={i.locale}
                description={i.description}
              />
            ))}
        </MapView>
        <View style={{ position: "absolute", bottom:0 }}>
          <AdMobBanner
            bannerSize="smartBannerLandscape"
            adUnitID="ca-app-pub-2099807487065953/2191937274"
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={this.bannerError}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    marginTop: "10%"
  },
  box: {
    height: "5%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#222"
  },
  kpi: {
    width: "33.3%",
    alignItems: "center",
    justifyContent: "center"
  },
  confirmed: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12
  },
  death: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12
  },
  recovered: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12
  }
});
