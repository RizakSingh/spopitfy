import { styled, Input } from 'tamagui'

const StyledInput = styled(Input, {
  backgroundColor: '#1a0000',
  borderColor: '#330000',
  borderWidth: 1,
  borderRadius: '$4',
  color: '#ffffff',
  height: 52,
  paddingHorizontal: '$4',
  fontSize: '$4',
  focusStyle: {
    borderColor: '#ff1a1a',
    backgroundColor: '#200000',
  },
})

export default function AppInput({ placeholder, ...props }: any) {
  return (
    <StyledInput
      {...props}
      placeholder={placeholder}
      placeholderTextColor="#bb8c8c"  // ✅ yahan pass karo, styled() mein nahi
    />
  )
}