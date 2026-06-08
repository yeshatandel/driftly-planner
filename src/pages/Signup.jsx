import { AuthExperience } from "../components/auth/AuthExperience.jsx"

export function Signup({ onBack, onSwitchToLogin }) {
  return <AuthExperience mode="signup" onBack={onBack} onSwitchMode={onSwitchToLogin} />
}
