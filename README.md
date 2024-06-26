# CommBank Goal Tracker
# Steps
1. Fork rWEB (https://github.com/fencer-so/commbank-web)
2. Start the web app in development mode
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
npm install
npm run start
3. Update the client’s goal model

// types.ts

export interface Goal {
  // ...

  icon: string | null
}
4. Display the icon on the goal card
// GoalCard.tsx

const Icon = styled.h1`
  font-size: 5.5rem;
`

export default function GoalCard(props: Props) {
  // ...

  return (
    <Container key={goal.id} onClick={onClick}>
      {/* ... */}

      <Icon>{goal.icon}</Icon>
    </Container>
  )
}
5. Implement an emoji picker