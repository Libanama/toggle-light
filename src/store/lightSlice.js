import { createSlice } from '@reduxjs/toolkit';

const lightSlice = createSlice({
  name: 'light',
  initialState: {
    isOn: false,
    brightness: 50,
    color: '#FFFFFF',
    autoMode: false,           
    autoStartHour: 18,         
    autoEndHour: 7,
    isLoaded: false,          // Pour savoir si les données sont chargées
  },
  reducers: {
    toggleLight: (state) => {
      state.isOn = !state.isOn;
    },
    turnOn: (state) => {
      state.isOn = true;
    },
    turnOff: (state) => {
      state.isOn = false;
    },
    setBrightness: (state, action) => {
      state.brightness = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    toggleAutoMode: (state) => {
      state.autoMode = !state.autoMode;
    },
    setAutoStartHour: (state, action) => {
      state.autoStartHour = action.payload;
    },
    setAutoEndHour: (state, action) => {
      state.autoEndHour = action.payload;
    },
    checkAutoSchedule: (state) => {
      if (state.autoMode) {
        const currentHour = new Date().getHours();
        
        if (state.autoStartHour > state.autoEndHour) {
          if (currentHour >= state.autoStartHour || currentHour < state.autoEndHour) {
            state.isOn = true;
          } else {
            state.isOn = false;
          }
        } else {
          if (currentHour >= state.autoStartHour && currentHour < state.autoEndHour) {
            state.isOn = true;
          } else {
            state.isOn = false;
          }
        }
      }
    },
    // NOUVELLE ACTION : Charger les préférences sauvegardées
    loadPreferences: (state, action) => {
      const savedData = action.payload;
      if (savedData) {
        state.brightness = savedData.brightness ?? state.brightness;
        state.color = savedData.color ?? state.color;
        state.autoMode = savedData.autoMode ?? state.autoMode;
        state.autoStartHour = savedData.autoStartHour ?? state.autoStartHour;
        state.autoEndHour = savedData.autoEndHour ?? state.autoEndHour;
      }
      state.isLoaded = true;
    },
  },
});

export const { 
  toggleLight, 
  turnOn, 
  turnOff, 
  setBrightness, 
  setColor,
  toggleAutoMode,
  setAutoStartHour,
  setAutoEndHour,
  checkAutoSchedule,
  loadPreferences
} = lightSlice.actions;

export default lightSlice.reducer;