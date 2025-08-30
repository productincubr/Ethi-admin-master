import countries from "countries-list";

const options = [
  { value: "iron", label: "iron" },
  { value: "protien", label: "protien" },
  { value: "vitamin", label: "vitamin" },
  { value: "carbes", label: "carbes" },
];
const medicalConditions = [
  {
    name: "Autoimmune Disorder",
    value: "Autoimmune Disorder",
  },
  {
    name: "Cancer",
    value: "Cancer",
  },
  {
    name: "Cardiovascular Disease",
    value: "Cardiovascular Disease",
  },
  {
    name: "COPD",
    value: "COPD",
  },
  {
    name: "Diabetes Mellitus",
    value: "Diabetes Mellitus",
  },
  {
    name: "High Blood Pressure",
    value: "High Blood Pressure",
  },
  {
    name: "IBS",
    value: "IBS",
  },
  {
    name: "Kidney Disease",
    value: "Kidney Disease",
  },
  {
    name: "Liver Disease",
    value: "Liver Disease",
  },
  {
    name: "None",
    value: "None",
  },
  {
    name: "Osteoporosis",
    value: "Osteoporosis",
  },
  {
    name: "Others",
    value: "Others",
  },
  {
    name: "PCOD/PCOS",
    value: "PCOD/PCOS",
  },
  {
    name: "Thyroid",
    value: "Thyroid",
  },
];

const symptoms = [
  {
    name: "Acne",
    value: "Acne",
  },
  {
    name: "Anxiety",
    value: "Anxiety",
  },
  {
    name: "Belching (Passing Gas)",
    value: "Belching (Passing Gas)",
  },
  {
    name: "Bloating",
    value: "Bloating",
  },
  {
    name: "Constipation",
    value: "Constipation",
  },
  {
    name: "Depression",
    value: "Depression",
  },
  {
    name: "Diarrhea",
    value: "Diarrhea",
  },
  {
    name: "Discolored tongue",
    value: "Discolored tongue",
  },
  {
    name: "Dizziness",
    value: "Dizziness",
  },
  {
    name: "Fatigue",
    value: "Fatigue",
  },
  {
    name: "Hairloss",
    value: "Hairloss",
  },
  {
    name: "Heartburn",
    value: "Heartburn",
  },
  {
    name: "Insomnia",
    value: "Insomnia",
  },
  {
    name: "Joint Pain",
    value: "Joint Pain",
  },
  {
    name: "Mood Swings",
    value: "Mood Swings",
  },
  {
    name: "Muscle Aches",
    value: "Muscle Aches",
  },
  {
    name: "Nausea",
    value: "Nausea",
  },
  {
    name: "Poor Memory",
    value: "Poor Memory",
  },
  {
    name: "Restlessness",
    value: "Restlessness",
  },
  {
    name: "Shortness of Breath",
    value: "Shortness of Breath",
  },
  {
    name: "Vomiting",
    value: "Vomiting",
  },
];

const diseases = [
  {
    name: "Autoimmune Disorder",
    value: "Autoimmune Disorder",
  },
  {
    name: "Cancer",
    value: "Cancer",
  },
  {
    name: "Cardio Vascular Disease",
    value: "Cardio Vascular Disease",
  },
  {
    name: "COPD",
    value: "COPD",
  },
  {
    name: "Diabetes Mellitus",
    value: "Diabetes Mellitus",
  },
  {
    name: "High Blood Pressure",
    value: "High Blood Pressure",
  },
  {
    name: "IBS",
    value: "IBS",
  },
  {
    name: "Kidney Disease",
    value: "Kidney Disease",
  },
  {
    name: "Liver Disease",
    value: "Liver Disease",
  },
  {
    name: "None",
    value: "None",
  },
  {
    name: "Osteoporosis",
    value: "Osteoporosis",
  },
  {
    name: "Others",
    value: "Others",
  },
  {
    name: "PCOD/PCOS",
    value: "PCOD/PCOS",
  },
];

const bloodGroup = [
  {
    name: "O positive",
    value: "O positive",
  },
  {
    name: "O negative",
    value: "O negative",
  },
  {
    name: "A positive",
    value: "A positive",
  },
  {
    name: "A negative",
    value: "A negative",
  },
  {
    name: "B positive",
    value: "B positive",
  },
  {
    name: "B negative",
    value: "B negative",
  },
  {
    name: "AB positive",
    value: "AB positive",
  },
  {
    name: "AB negative:",
    value: "AB negative:",
  },
];

const foodPre = [
  {
    name: "Vegan",
    value: "Vegan",
  },
  {
    name: "Vegetarian, no eggs   ",
    value: "Vegetarian, no eggs   ",
  },
  {
    name: " Vegetarian, eggs.  ",
    value: " Vegetarian, eggs.  ",
  },
  {
    name: "   Non vegetarian ",
    value: "   Non vegetarian ",
  },
];

const cuisines = [
  {
    name: "North Indian",
    value: "North Indian",
  },
  {
    name: "South Indian",
    value: "South Indian",
  },
  {
    name: "American",
    value: "American",
  },
  {
    name: "Italian",
    value: "Italian",
  },
  {
    name: "Vietnamese",
    value: "Vietnamese",
  },
  {
    name: "Thai",
    value: "Thai",
  },
  {
    name: "European",
    value: "European",
  },
  {
    name: "Mexican",
    value: "Mexican",
  },
  {
    name: "Japanese",
    value: "Japanese",
  },
  {
    name: "Indian Street Food",
    value: "Indian Street Food",
  },
  {
    name: "Mediterranean",
    value: "Mediterranean",
  },
  {
    name: "Others",
    value: "Others",
  },
];

const cravings = [
  {
    name: "Sweet",
    value: "Sweet",
  },
  {
    name: "Salty",
    value: "Salty",
  },
  {
    name: "Sour",
    value: "Sour",
  },
  {
    name: "Crunchy",
    value: "Crunchy",
  },
  {
    name: "Others",
    value: "Others",
  },
];

const radioOptionTitle = [
  {
    title: "Alcohol ",
    id_Call: "food_alcohol_name",
  },
  {
    title: "Biscuits/Cakes/Pastries",
    id_Call: "food_biscuit_name",
  },
  {
    title: "Diet Sodas",
    id_Call: "food_diet_soda_name",
  },
  {
    title: "Coffee ",
    id_Call: "food_coffee_name",
  },
  {
    title: "Tea ",
    id_Call: "food_tea_name",
  },
];

const triggers = [
  {
    name: "Time of The Day",
    value: "Time of The Day",
  },
  {
    name: "Seeing Food",
    value: "Seeing Food",
  },
  {
    name: "Hunger",
    value: "Hunger",
  },
  {
    name: "Boredom",
    value: "Boredom",
  },
  {
    name: "Others",
    value: "Others",
  },
];

const hungryTime = [
  {
    name: "Morning",
    value: "Morning",
  },
  {
    name: "Dinner Time",
    value: "Dinner Time",
  },
  {
    name: "Evening",
    value: "Evening",
  },
  {
    name: "Other",
    value: "Other",
  },
  {
    name: "Lunch Time",
    value: "Lunch Time",
  },
];

const activityOptionTitle = [
  {
    title: "Endurance  ",
    id_Call: "endurance_name",
  },
  {
    title: "Strength Training",
    id_Call: "strength_training_name",
  },
  {
    title: "Yoga",
    id_Call: "yoga_name",
  },
  {
    title: "Flexibility/balance",
    id_Call: "flexibility_balance_name",
  },
];

// Diet time and meal data
const dietPlanData = [
  {
    time: "08:00 AM",
    meal: "On Waking Up",
    food_items: ["4 soaked & peeled almonds", "4 soaked manaka"],
  },
  {
    time: "10:00 AM",
    meal: "Breakfast",
    food_items: [
      "1 bowl veg quinoa",
      "or 1 Dal cheela",
      "or 1 bowl chia seeds pudding",
    ],
  },
  {
    time: "11:30 AM",
    meal: "Midmorning",
    food_items: [
      "1 glass nariyal pani + 1 tsp soaked chia seeds",
      "or 1 bowl papaya",
    ],
  },
  {
    time: "02:00 PM",
    meal: "Lunch",
    food_items: [
      "1 cup chamomile/spearmint tea ",
      "katori roasted makhana/2 prunes",
    ],
  },
  {
    time: "05:00 PM",
    meal: "Evening Snacks",
    food_items: [
      "1 katori dal + sabzi + 1 beetroot/spinach chapati ",
      "or 1 katori dal + veggies + 1 katori rice",
    ],
  },
  {
    time: "08:00 PM",
    meal: "Dinner",
    food_items: [
      "1 glass nariyal pani + 1 tsp soaked chia seeds",
      "or 1 bowl papaya",
    ],
  },
  {
    time: "11:00 PM",
    meal: "Bedtime",
    food_items: ["1 tsp Ashwagandha + 4 soaked cashews"],
  },
];

const heightfeet = Array.from({ length: 10 }, (_, index) => ({
  input: (index + 1).toString(),
}));
const heightInch = Array.from({ length: 11 }, (_, index) => ({
  input: (index + 1).toString(),
}));
const stressLevel = Array.from({ length: 10 }, (_, index) => ({
  input: (index + 1).toString(),
}));

const options_leave = [
  { value: "Sick Leave", label: "Sick Leave" },
  { value: "Casual Leave", label: "Casual Leave" },
  { value: "Parental Leave", label: "Parental Leave" },
];

const countryOptions = countries.countries;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export {
  monthNames,
  months,
  countryOptions,
  options_leave,
  options,
  medicalConditions,
  symptoms,
  diseases,
  bloodGroup,
  foodPre,
  cuisines,
  cravings,
  radioOptionTitle,
  triggers,
  hungryTime,
  activityOptionTitle,
  dietPlanData,
  heightfeet,
  heightInch,
  stressLevel,
};
