export default {
  user: null,
  routines: [
    { id: 0,
      name: "Hombros Lunes",
      cycles:4,
      exercises: 10,
      duration:"2hs"},
    { id: 1,
      name: "Piernas Jueves",
      cycles:5,
      exercises: 12,
      duration:"1h 30min" },
    { id: 2,
      name: "Rutina 3",
      cycles:3,
      exercises: 10,
      duration:"1h" },
    { id: 3,
      name: "Rutina 3",
      cycles:3,
      exercises: 10,
      duration:"1h" },
    { id: 4,
      name: "Rutina 3",
      cycles:3,
      exercises: 10,
      duration:"1h" },
  ],

  exercises: [
    {id: 0,
      routineId: 0,
      name: "Press plano",
      repetitions: 10,
      time: 10,
      weight: 10},
    {id: 1,
      routineId: 0,
      name: "Press plano 2",
      repetitions: 20,
      time: 30,
      weight: 20}
  ]
}


