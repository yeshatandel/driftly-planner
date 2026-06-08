// Simple currency conversion helper: USD -> INR
export const USD_TO_INR = 82.5

export function formatINR(usdAmount, rate = USD_TO_INR) {
  const value = Number(usdAmount) * Number(rate)
  if (Number.isNaN(value)) return "₹0"

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

export default formatINR
