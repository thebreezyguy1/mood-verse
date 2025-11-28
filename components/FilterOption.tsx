import { FilterType } from "@/app/(tabs)/bookmarks";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type FilterOptionProps = {
  label: string;
  type: FilterType;
  activeFilter: FilterType;
  onSelect: (type: FilterType) => void;
};

const FilterOption: React.FC<FilterOptionProps> = ({
  label,
  type,
  activeFilter,
  onSelect,
}) => {
  const isActive = activeFilter === type;

  return (
    <TouchableOpacity
      style={filterStyles.optionContainer}
      onPress={() => onSelect(type)}
    >
      <Text
        style={[filterStyles.optionText, isActive && filterStyles.activeText]}
      >
        {label}
      </Text>

      {isActive && (
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color="pink"
          style={filterStyles.checkmark}
        />
      )}
    </TouchableOpacity>
  );
};

export default FilterOption;

const filterStyles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  activeText: {
    fontWeight: "bold",
    color: "pink",
  },
  checkmark: {
    marginLeft: 10,
  },
});
