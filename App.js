import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './src/store/store';
import { toggleLight, turnOn, turnOff, setBrightness, setColor, toggleAutoMode, setAutoStartHour, setAutoEndHour, checkAutoSchedule, loadPreferences } from './src/store/lightSlice';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clé pour sauvegarder les données
const STORAGE_KEY = '@toggle_light_preferences';

function LightScreen() {
  const { isOn, brightness, color, autoMode, autoStartHour, autoEndHour, isLoaded } = useSelector(state => state.light);
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = React.useState(false);

  // CHARGER les préférences au démarrage
  useEffect(() => {
    loadSavedPreferences();
  }, []);

  // SAUVEGARDER automatiquement quand les préférences changent
  useEffect(() => {
    if (isLoaded) {
      savePreferences();
    }
  }, [brightness, color, autoMode, autoStartHour, autoEndHour, isLoaded]);

  // Fonction pour charger les préférences
  const loadSavedPreferences = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData !== null) {
        const preferences = JSON.parse(savedData);
        dispatch(loadPreferences(preferences));
        console.log('✅ Préférences chargées:', preferences);
      } else {
        dispatch(loadPreferences(null));
        console.log('ℹ️ Aucune préférence sauvegardée');
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement:', error);
      dispatch(loadPreferences(null));
    }
  };

  // Fonction pour sauvegarder les préférences
  const savePreferences = async () => {
    try {
      const dataToSave = {
        brightness,
        color,
        autoMode,
        autoStartHour,
        autoEndHour,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      console.log('💾 Préférences sauvegardées:', dataToSave);
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
    }
  };

  // Vérifier automatiquement toutes les minutes
  useEffect(() => {
    if (autoMode) {
      dispatch(checkAutoSchedule());
      const interval = setInterval(() => {
        dispatch(checkAutoSchedule());
      }, 60000); // Vérifier toutes les minutes

      return () => clearInterval(interval);
    }
  }, [autoMode, dispatch]);

  // Calculer l'opacité en fonction de la luminosité
  const opacity = isOn ? brightness / 100 : 0.1;

  // Palette de couleurs
  const colors = ['#FFFFFF', '#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#FFA07A'];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { backgroundColor: '#1a1a1a' }]}>
      
      {/* Zone de lumière avec effet de luminosité */}
      <View style={[styles.lightBulb, { 
        backgroundColor: isOn ? color : '#333',
        opacity: opacity,
        shadowColor: color,
        shadowOpacity: isOn ? 0.8 : 0,
        shadowRadius: brightness / 2,
      }]}>
        <Text style={styles.emoji}>
          {isOn ? '💡' : '🌑'}
        </Text>
      </View>

      {/* Statut */}
      <Text style={[styles.statusText, { color: isOn ? color : '#666' }]}>
        La lumière est {isOn ? 'ALLUMÉE' : 'ÉTEINTE'}
      </Text>

      {/* Mode automatique */}
      <View style={styles.autoModeContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>🤖 Mode Automatique :</Text>
          <Switch
            value={autoMode}
            onValueChange={() => dispatch(toggleAutoMode())}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={autoMode ? '#fff' : '#f4f3f4'}
          />
        </View>

        {autoMode && (
          <View>
            {/* Bouton Réglages */}
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => setShowSettings(!showSettings)}
            >
              <Text style={styles.settingsButtonText}>
                {showSettings ? '▼ Masquer les réglages' : '▶ Afficher les réglages'}
              </Text>
            </TouchableOpacity>

            {/* Résumé des horaires (toujours visible) */}
            {!showSettings && (
              <Text style={styles.scheduleSummary}>
                🕐 Programmé : {autoStartHour}h → {autoEndHour}h
              </Text>
            )}

            {/* Tableau des réglages (caché par défaut) */}
            {showSettings && (
              <View style={styles.scheduleContainer}>
                <Text style={styles.scheduleTitle}>⏰ Horaires automatiques</Text>
                
                {/* Heure d'allumage */}
                <View style={styles.timeControl}>
                  <Text style={styles.timeLabel}>Allumer à : {autoStartHour}h</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={23}
                    step={1}
                    value={autoStartHour}
                    onValueChange={(value) => dispatch(setAutoStartHour(value))}
                    minimumTrackTintColor="#4CAF50"
                    maximumTrackTintColor="#666"
                    thumbTintColor="#4CAF50"
                  />
                </View>

                {/* Heure d'extinction */}
                <View style={styles.timeControl}>
                  <Text style={styles.timeLabel}>Éteindre à : {autoEndHour}h</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={23}
                    step={1}
                    value={autoEndHour}
                    onValueChange={(value) => dispatch(setAutoEndHour(value))}
                    minimumTrackTintColor="#F44336"
                    maximumTrackTintColor="#666"
                    thumbTintColor="#F44336"
                  />
                </View>

                <Text style={styles.scheduleInfo}>
                  💡 La lumière s'allumera automatiquement de {autoStartHour}h à {autoEndHour}h
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Switch Toggle manuel (désactivé si mode auto) */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Interrupteur manuel :</Text>
        <Switch
          value={isOn}
          onValueChange={() => dispatch(toggleLight())}
          trackColor={{ false: '#767577', true: color }}
          thumbColor={isOn ? '#fff' : '#f4f3f4'}
          disabled={autoMode}
        />
        {autoMode && <Text style={styles.disabledText}>(désactivé en mode auto)</Text>}
      </View>

      {/* Boutons ON/OFF */}
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.onButton, autoMode && styles.disabledButton]} 
          onPress={() => dispatch(turnOn())}
          disabled={autoMode}
        >
          <Text style={styles.buttonText}>🔆 Allumer</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.offButton, autoMode && styles.disabledButton]} 
          onPress={() => dispatch(turnOff())}
          disabled={autoMode}
        >
          <Text style={styles.buttonText}>🌙 Éteindre</Text>
        </TouchableOpacity>
      </View>

      {/* Slider de luminosité */}
      {isOn && (
        <View style={styles.brightnessContainer}>
          <Text style={styles.label}>Luminosité : {brightness}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={brightness}
            onValueChange={(value) => dispatch(setBrightness(Math.round(value)))}
            minimumTrackTintColor={color}
            maximumTrackTintColor="#666"
            thumbTintColor={color}
          />
        </View>
      )}

      {/* Sélecteur de couleur */}
      {isOn && (
        <View style={styles.colorContainer}>
          <Text style={styles.label}>Couleur :</Text>
          <View style={styles.colorPalette}>
            {colors.map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.colorCircle,
                  { backgroundColor: c },
                  color === c && styles.selectedColor
                ]}
                onPress={() => dispatch(setColor(c))}
              />
            ))}
          </View>
        </View>
      )}

    </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <LightScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  lightBulb: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 10,
  },
  emoji: {
    fontSize: 60,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  autoModeContainer: {
    width: '100%',
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  scheduleContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  settingsButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  scheduleSummary: {
    color: '#4CAF50',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
  scheduleTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  timeControl: {
    marginBottom: 15,
  },
  timeLabel: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 5,
  },
  scheduleInfo: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 10,
    fontWeight: '600',
  },
  disabledText: {
    color: '#888',
    fontSize: 12,
    marginLeft: 10,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 3,
  },
  onButton: {
    backgroundColor: '#4CAF50',
  },
  offButton: {
    backgroundColor: '#F44336',
  },
  disabledButton: {
    backgroundColor: '#666',
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  brightnessContainer: {
    width: '100%',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  colorContainer: {
    width: '100%',
    alignItems: 'center',
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#FFF',
    borderWidth: 4,
  },
});