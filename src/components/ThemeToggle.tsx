import { IonIcon, IonButton } from '@ionic/react';
import { moon, sunny } from 'ionicons/icons';
import { useTheme } from '../context/ThemeContext';
import '../styles/ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <IonButton
      fill="clear"
      onClick={toggleTheme}
      className="theme-toggle-button"
      aria-label="Toggle dark mode"
    >
      <IonIcon
        slot="icon-only"
        icon={isDarkMode ? sunny : moon}
        className="theme-icon"
      />
    </IonButton>
  );
};

export default ThemeToggle;
