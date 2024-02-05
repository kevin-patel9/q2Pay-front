import { SafeAreaView } from "react-native";

const ViewComponent = ({children}) => {
    return (
        <SafeAreaView style={{ marginTop: 60, paddingHorizontal: 26 }}>
            {children}
        </SafeAreaView>
    )
};

export default ViewComponent;