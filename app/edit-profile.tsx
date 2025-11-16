import { useUser } from "@/components/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import PhoneInput from "react-native-phone-input";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileModal() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [streetAddress1, setStreetAddress1] = useState(user.streetAddress1);
  const [streetAddress2, setStreetAddress2] = useState(user.streetAddress2);
  const [city, setCity] = useState(user.city);
  const [zipCode, setZipCode] = useState(user.zipCode);
  const [countryCode, setCountryCode] = useState<CountryCode>(user.countrycode);
  const [phone, setPhone] = useState(user.phone);
  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);

  const phoneInput = useRef<PhoneInput>(null);
  const handleCountrySelect = (country: any) => {
    setCountryCode(country.cca2);
    const newPhoneNumber = `+${country.callingCode[0]}`;
    setPhone(newPhoneNumber);
    if (phoneInput.current) {
      phoneInput.current.selectCountry(country.cca2.toLowerCase());
      phoneInput.current.setValue(newPhoneNumber);
    }
    setShowPhoneCountryPicker(false);
  };

  const updateInfo = () => {
    setUser({
      ...user,
      firstName: firstName,
      lastName: lastName,
      email: email,
      streetAddress1: streetAddress1,
      streetAddress2: streetAddress2,
      city: city,
      zipCode: zipCode,
      countrycode: countryCode,
      phone: phone,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <View style={styles.handle} />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        <View>
          <View>
            <Text>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit Name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.editInfo}>
            <Text>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit Last Name"
              value={lastName}
              onChangeText={setLastName}
            ></TextInput>
          </View>
          <View style={styles.editInfo}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit Email"
              value={email}
              onChangeText={setEmail}
            ></TextInput>
          </View>
          <View style={styles.editInfo}>
            <Text>Street Address 1</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit Street Address 1"
              value={streetAddress1}
              onChangeText={setStreetAddress1}
            ></TextInput>
          </View>
          <View style={styles.editInfo}>
            <Text>Street Address 2</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit Street Address 2"
              value={streetAddress2}
              onChangeText={setStreetAddress2}
            ></TextInput>
          </View>
          <View style={styles.editInfo}>
            <Text>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit City"
              value={city}
              onChangeText={setCity}
            ></TextInput>
          </View>
          <View style={styles.editInfo}>
            <Text>Zip Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit Zip Code"
              value={zipCode}
              onChangeText={setZipCode}
            ></TextInput>
          </View>
          <View style={styles.editInfo}>
            <Text>Phone Number</Text>
            <View style={styles.phoneRow}>
              <PhoneInput
                ref={phoneInput}
                style={styles.input}
                initialValue={phone}
                initialCountry={countryCode.toLowerCase()}
                onPressFlag={() => setShowPhoneCountryPicker(true)}
                onChangePhoneNumber={(text) => {
                  setPhone(text);
                }}
              />
              <CountryPicker
                countryCode={countryCode}
                visible={showPhoneCountryPicker}
                onSelect={handleCountrySelect}
                onClose={() => setShowPhoneCountryPicker(false)}
                withFlagButton={false}
                withFilter
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={updateInfo}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  handle: {
    width: 40,
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 8,
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    minHeight: "45%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 8,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 36,
  },
  form: {
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: "#FF69B4",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
  },
  editInfo: {
    marginTop: 12,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
  },
  countryText: {
    marginRight: 6,
    fontSize: 16,
  },
  countryModal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  countryList: {
    backgroundColor: "#fff",
    maxHeight: "50%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 12,
  },
  countryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  closeCountries: {
    padding: 12,
    alignItems: "center",
  },
});
