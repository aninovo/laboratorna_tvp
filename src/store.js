// store.js
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            tact: [],
            sensors: [],
            mechanisms: [],
            sensorStates: {},
            mechanismStates: {},
            // Define all actions as methods that use `set`
            addTact: (newTact) =>
                set((state) => ({ tact: [...state.tact, newTact] })),
            addSensor: (newSensor) =>
                set((state) => ({ sensors: [...state.sensors, newSensor] })),
            addMechanism: (newMechanism) =>
                set((state) => ({
                    mechanisms: [...state.mechanisms, newMechanism],
                })),
            updateSensorState: (tactId, sensorName, value) =>
                set((state) => ({
                    sensorStates: {
                        ...state.sensorStates,
                        [tactId]: {
                            ...state.sensorStates[tactId],
                            [sensorName]: value,
                        },
                    },
                })),
            updateMechanismState: (tactId, mechanismName, value) =>
                set((state) => ({
                    mechanismStates: {
                        ...state.mechanismStates,
                        [tactId]: {
                            ...state.mechanismStates[tactId],
                            [mechanismName]: value,
                        },
                    },
                })),
            reset: () =>
                set({
                    tact: [],
                    sensors: [],
                    mechanisms: [],
                    sensorStates: {},
                    mechanismStates: {},
                }),
        }),
        {
            name: 'plc-storage', // unique name for the storage (required)
        }
    )
);

export default useStore;
