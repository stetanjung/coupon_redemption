import "./App.css";
import RedemptionForm from "./component/RedemptionForm";

function App() {
	const handleRedeemSuccess = () => {
		console.log("Coupon redeemed successfully!");
		window.alert("Coupon redeemed successfully!");
	};

	const handleRedeemError = (error: string) => {
		console.error("Coupon redemption failed:", error);
		window.alert(error);
	};

	return (
		<>
			<RedemptionForm
				onRedeemSuccess={handleRedeemSuccess}
				onRedeemError={handleRedeemError}
			/>
		</>
	);
}

export default App;
