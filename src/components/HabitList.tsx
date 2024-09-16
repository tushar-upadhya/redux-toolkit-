import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import { toggleHabit, removeHabit } from "../features/habitSlice";

const HabitList = () => {
  const today = new Date().toISOString().split('T')[0];
  const habits = useSelector((state: RootState) => state.habits.habits);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid container alignItems={'center'}>
            <Grid>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant='body2' color='text.secondary'>{habit.frequency}</Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  color={habit.completedDates.includes(today) ? 'success' : 'primary'}
                  variant="outlined"
                  startIcon={<CheckCircle />}
                  onClick={() => dispatch(toggleHabit({ id: habit.id, date: today }))}
                >
                  {habit.completedDates.includes(today) ? 'Completed' : 'Mark Completed'}
                </Button>

                <Button
                  color={'error'}
                  variant="outlined"
                  startIcon={<Delete />}
                  onClick={() => dispatch(removeHabit({ id: habit.id }))}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
