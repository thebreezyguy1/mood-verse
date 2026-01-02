import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SortFilterType = "asc" | "desc";

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilter: (filterType: SortFilterType) => void;
  currentFilter: SortFilterType;
}

interface FilterOptionProps {
  label: string;
  type: SortFilterType;
  activeSelection: SortFilterType;
  onSelect: (type: SortFilterType) => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  label,
  type,
  activeSelection,
  onSelect,
}) => {
  const isActive = activeSelection === type;

  return (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => onSelect(type)}
    >
      <Text style={[styles.optionText, isActive && styles.activeText]}>
        {label}
      </Text>

      {isActive && (
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color="pink"
          style={styles.checkmark}
        />
      )}
    </TouchableOpacity>
  );
};

export default function SortFilterModal({
  isVisible,
  onClose,
  onApplyFilter,
  currentFilter,
}: FilterModalProps) {
  const handleFilterAndClose = (type: SortFilterType) => {
    onApplyFilter(type);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Filter By</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <FilterOption
            label="Ascending Order"
            type="asc"
            activeSelection={currentFilter}
            onSelect={handleFilterAndClose}
          />
          <FilterOption
            label="Descending Order"
            type="desc"
            activeSelection={currentFilter}
            onSelect={handleFilterAndClose}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: "absolute",
    backgroundColor: "#a9a9a9ff",
    bottom: 0,
    padding: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
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
