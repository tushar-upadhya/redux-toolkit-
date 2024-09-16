import { Container, Typography } from "@mui/material"
import AddHabitForm from "./components/AddHabitForm"
import HabitList from "./components/HabitList"
import HabitSta from "./components/HabitSta"

const App = () => {
  return (
    <Container maxWidth='md'>
      <Typography component='h1' variant="h2">
        habit tracker
      </Typography>
      <AddHabitForm />
      <HabitList />
      <HabitSta />
    </Container>
  )
}
export default App