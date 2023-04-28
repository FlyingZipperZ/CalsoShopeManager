import { StyleSheet, Text, View } from "react-native";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import SettingButtons from "../../components/settings/SettingsButtons/SettingButtons";
import LogoutButton from "../../components/settings/SettingsButtons/LogoutButton";

const SettingsScreen = () => {
  const navigation = useNavigation();
  function addHandler() {
    navigation.navigate("SalesPeople");
  }

  function buttonHandler() {
    Alert.alert(
      "You pressed this button",
      "Good job you pressed this button you shouldn't press a button that you dont know what it does",
      [
        { text: "cancel but with lowercase c" },
        { text: "Cancel", style: "cancel" },
      ]
    );
  }
  function logOutHandler() {
    Alert.alert("Logout?", "Are you sure you'd like to logout?", [
      { text: "Logout" },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  return (
    <View>
      <SettingButtons title="Sales Person" onPress={addHandler} />
      <SettingButtons title="idk something crazy" onPress={buttonHandler} />
      <LogoutButton title="Logout" onPress={logOutHandler} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
