import { AuthExperience } from "../components/auth/AuthExperience.jsx"

export function ForgotPassword({ onBack, onSwitchToLogin }) {
  return <AuthExperience mode="forgot" onBack={onBack} onSwitchMode={onSwitchToLogin} onForgotPassword={() => onSwitchToLogin?.()} />
}
