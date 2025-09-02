import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type ViewStyle, type TextStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline"
  size?: "small" | "medium" | "large"
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[size],
    variant === "outline" && styles.outline,
    disabled && styles.disabled,
    style,
  ]

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    variant === "outline" && styles.outlineText,
    disabled && styles.disabledText,
    textStyle,
  ]

  const handlePress = () => {
    if (!loading && !disabled) {
      onPress()
    }
  }

  if (variant === "primary") {
    return (
      <TouchableOpacity onPress={handlePress} style={buttonStyle} activeOpacity={0.8}>
        <LinearGradient
          colors={["#059669", "#10B981"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {loading ? <ActivityIndicator color="#FFFFFF" size="small" /> : <Text style={textStyles}>{title}</Text>}
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={handlePress} style={buttonStyle} activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#059669" : "#FFFFFF"} size="small" />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  small: {
    height: 36,
    paddingHorizontal: 16,
  },
  medium: {
    height: 48,
    paddingHorizontal: 24,
  },
  large: {
    height: 56,
    paddingHorizontal: 32,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#059669",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
    color: "#FFFFFF",
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  outlineText: {
    color: "#059669",
  },
  disabledText: {
    color: "#9CA3AF",
  },
})

export default Button
