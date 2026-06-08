import { AuthSplitExperience } from "../components/auth/AuthSplitExperience.jsx"

export function RegisterExperience({ onBack }) {
  return <AuthSplitExperience mode="register" onBack={onBack} onSwitchMode={() => onBack?.()} onForgotPassword={() => {}} />
}

export default RegisterExperience
