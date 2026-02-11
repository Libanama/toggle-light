# 💡 Toggle Light - Smart Light Control App

Une application mobile React Native de contrôle de lumière intelligente avec gestion d'état Redux et persistance des données.

## 📱 Aperçu du projet

Toggle Light est une application de gestion de lumière connectée permettant de contrôler l'intensité lumineuse, la couleur et la programmation automatique basée sur des horaires.

### ✨ Fonctionnalités principales

- 🔆 **Contrôle manuel** : Allumer/éteindre la lumière avec switch ou boutons
- 🎨 **Sélection de couleurs** : Palette de 6 couleurs prédéfinies
- 🎚️ **Réglage de luminosité** : Slider pour ajuster l'intensité (0-100%)
- 🤖 **Mode automatique** : Programmation horaire pour allumage/extinction automatique
- 💾 **Sauvegarde des préférences** : Persistance locale avec AsyncStorage
- 🎭 **Interface responsive** : Design moderne avec animations et feedback visuel

## 🛠️ Technologies utilisées

### Frontend
- **React Native** - Framework mobile cross-platform
- **Redux Toolkit** - Gestion d'état moderne et optimisée
- **React Redux** - Connexion React-Redux

### Librairies
- `@react-native-community/slider` - Composant slider personnalisable
- `@react-native-async-storage/async-storage` - Persistance locale des données

### Outils de développement
- **npm** - Gestionnaire de paquets
- **Metro Bundler** - Bundler React Native
- **Expo** (optionnel) - Plateforme de développement

## 📦 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn
- React Native CLI ou Expo CLI
- Android Studio (pour Android) ou Xcode (pour iOS)

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone https://github.com/Libanama/toggle-light.git
cd toggle_light
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer l'application**

Pour Android :
```bash
npm start
# Puis appuyez sur 'a'
```

Pour iOS :
```bash
npm start
# Puis appuyez sur 'i'
```

## 🏗️ Architecture du projet

```
toggle_light/
├── src/
│   └── store/
│       ├── store.js          # Configuration du store Redux
│       └── lightSlice.js     # Slice Redux pour la gestion de la lumière
├── App.js                     # Composant principal
├── package.json
└── README.md
```

### Architecture Redux

Le projet utilise **Redux Toolkit** avec une architecture en slices :

- **lightSlice** : Gestion de l'état de la lumière (ON/OFF, couleur, luminosité, mode auto)
- **Actions** : `toggleLight`, `setBrightness`, `setColor`, `toggleAutoMode`, etc.
- **Persistance** : Sauvegarde automatique avec AsyncStorage à chaque modification

## 🎯 Fonctionnalités détaillées

### Mode Manuel
- Switch toggle pour allumer/éteindre
- Boutons dédiés ON/OFF
- Contrôle immédiat de l'état

### Réglages de lumière
- **Luminosité** : Slider de 0 à 100%
- **Couleur** : 6 couleurs (Blanc, Or, Rouge corail, Turquoise, Vert menthe, Saumon)
- Effet visuel dynamique sur l'ampoule

### Mode Automatique
- Activation via switch dédié
- Configuration des horaires :
  - Heure d'allumage (0-23h)
  - Heure d'extinction (0-23h)
- Vérification automatique toutes les minutes
- Support des plages horaires traversant minuit
- Interface de réglages masquable

### Persistance des données
Sauvegarde automatique de :
- Luminosité sélectionnée
- Couleur choisie
- État du mode automatique
- Horaires configurés

## 🎨 Interface utilisateur

- Design sombre moderne (#1a1a1a background)
- Ampoule visuelle avec effet d'ombre dynamique
- Feedback visuel immédiat
- Désactivation contextuelle des contrôles (mode auto)
- Interface scrollable pour petits écrans

## 🧪 Cas d'usage

1. **Contrôle simple** : Allumer/éteindre rapidement
2. **Ambiance personnalisée** : Choisir couleur et intensité pour différents moments
3. **Programmation** : Automatiser l'éclairage selon un horaire quotidien
4. **Persistance** : Retrouver ses réglages favoris à chaque ouverture

## 📚 Apprentissages techniques

Ce projet m'a permis de maîtriser :

- ✅ Gestion d'état global avec **Redux Toolkit**
- ✅ Architecture en slices et reducers
- ✅ Hooks React (`useState`, `useEffect`, `useSelector`, `useDispatch`)
- ✅ Persistance locale avec **AsyncStorage**
- ✅ Composants React Native avancés
- ✅ Gestion du state conditionnel (mode manuel vs automatique)
- ✅ Styling et animations en React Native
- ✅ Patterns de développement évolutif

## 🚀 Évolutions possibles

- [ ] Ajout de scénarios prédéfinis (Lecture, Travail, Détente)
- [ ] Animations de transition avancées
- [ ] Contrôle par gestes (swipe, double tap)
- [ ] Connexion avec une vraie API domotique
- [ ] Mode nuit automatique basé sur le lever/coucher du soleil
- [ ] Historique d'utilisation
- [ ] Notifications push pour le mode automatique

## 👤 Auteur

**Libana** - Développeuse Web et Web Mobile en formation  
Formation DWWM - Septembre 2025 à Avril 2026

## 📄 Licence

Ce projet est libre d'utilisation à des fins éducatives et de portfolio.

---

⭐ Si ce projet vous a plu, n'hésitez pas à lui donner une étoile sur GitHub !