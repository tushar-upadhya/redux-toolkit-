import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { fetchHabits } from "../features/habitSlice";
import { Paper } from "@mui/material";

const HabitSta: React.FC = () => {
 const { habits, isLoading, error } = useSelector((state: RootState) => state.habits);
 const dispatch = useDispatch<AppDispatch>()

 useEffect(() => {
  dispatch(fetchHabits())
 },[])
 return (
  <Paper elevation={2} sx={{p:2, mt:4}}>
   
  </Paper>
 )
}
export default HabitSta