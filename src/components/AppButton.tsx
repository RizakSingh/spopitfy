import { styled, Button, Text } from 'tamagui'

const StyledButton = styled(Button, {
  height: 56,
  borderRadius: '$4',
  backgroundColor: '#9b0e0e',
  pressStyle: {
    backgroundColor: '#8d3e3e',
    scale: 0.98,
  },
})

export default function AppButton({ title, ...props }: any) {
  return (
    <StyledButton {...props}>
      <Text color="#ffffff" fontSize={14} fontWeight="800" letterSpacing={3}>
        {title}
      </Text>
    </StyledButton>
  )
}