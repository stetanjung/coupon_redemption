import React, { useState } from "react";

interface RedemptionFormProps {
	onRedeemSuccess?: () => void;
	onRedeemError?: (error: string) => void;
}

const RedemptionForm: React.FC<RedemptionFormProps> = ({
	onRedeemSuccess,
	onRedeemError,
}) => {
	const [formData, setFormData] = useState({ hkid: "", couponCode: "" });

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const url = import.meta.env.VITE_REACT_APP_API_URL;
			const response = await fetch(`${url}/redemption`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				console.log("Coupon redeemed successfully!");
				if (onRedeemSuccess) {
					onRedeemSuccess();
				}
			} else {
				console.error("Failed to redeem coupon:", response.statusText);
				if (onRedeemError) {
					const returnData = await response.json();
					onRedeemError(returnData.message);
				}
			}
		} catch (error) {
			console.error("Error redeeming coupon:", error);
			if (onRedeemError) {
				onRedeemError("Coupon redemption failed");
			}
		}
	};

	return (
		<>
			<h1>Coupon Redemption</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Hong Kong ID:
					<input
						type="text"
						name="hkid"
						value={formData.hkid}
						onChange={handleInputChange}
						required
					/>
				</label>
				<br />
				<label>
					Coupon Code:
					<input
						type="text"
						name="couponCode"
						value={formData.couponCode}
						onChange={handleInputChange}
						required
					/>
				</label>
				<br /> <br />
				<button type="submit">Redeem Coupon</button>
			</form>
		</>
	);
};

export default RedemptionForm;
