import { AuthExperience } from "../components/auth/AuthExperience.jsx"

export function Login({ onBack, onSwitchToSignup, onForgotPassword }) {
  return <AuthExperience mode="login" onBack={onBack} onSwitchMode={onSwitchToSignup} onForgotPassword={onForgotPassword} />
}
