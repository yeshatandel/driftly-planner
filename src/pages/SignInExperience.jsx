import { AuthSplitExperience } from "../components/auth/AuthSplitExperience.jsx"

export function SignInExperience({ onBack, onCreatePassport, onForgotPassword }) {
  return <AuthSplitExperience mode="login" onBack={onBack} onSwitchMode={() => onCreatePassport?.()} onForgotPassword={onForgotPassword} />
}

export default SignInExperience
