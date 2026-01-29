import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonInput,
  IonText,
  IonIcon,
} from '@ionic/react';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import '../styles/Signin.css';

const Signin: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleInputChange = (field: string, value: string | number | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSignin = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      // Dummy authentication - just check if password has at least 6 characters
      if (formData.password.length >= 6) {
        // Store signin session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUsername', formData.username);

        // Simulate login delay
        setTimeout(() => {
          setLoading(false);
          history.push('/students');
        }, 1000);
      } else {
        setLoading(false);
        setErrors({
          password: 'Invalid username or password',
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleNavigateToSignup = () => {
    history.push('/signup');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignin();
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="signin-content">
        <div className="signin-container">
          <IonCard className="signin-card">
            <IonCardContent className="signin-card-content">
              <div className="signin-header">
                <h1 className="signin-title">Welcome Back</h1>
                <p className="signin-subtitle">Sign in to your account</p>
              </div>

              <form className="signin-form" onSubmit={(e) => e.preventDefault()}>
                {/* Username Field */}
                <div className="form-group">
                  <label className="form-label">
                    <IonIcon icon={personOutline} className="field-icon" />
                    Username
                  </label>
                  <IonInput
                    className={`form-input ${errors.username ? 'input-error' : ''}`}
                    placeholder="Enter username"
                    value={formData.username}
                    onIonChange={(e) => handleInputChange('username', e.detail.value)}
                    type="text"
                    onKeyPress={handleKeyPress}
                  />
                  {errors.username && <span className="error-text">{errors.username}</span>}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label className="form-label">
                    <IonIcon icon={lockClosedOutline} className="field-icon" />
                    Password
                  </label>
                  <IonInput
                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                    placeholder="Enter password"
                    value={formData.password}
                    onIonChange={(e) => handleInputChange('password', e.detail.value)}
                    type="password"
                    onKeyPress={handleKeyPress}
                  />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {/* Signin Button */}
                <IonButton
                  expand="block"
                  className="signin-button"
                  onClick={handleSignin}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </IonButton>
              </form>

              {/* Info Message */}
              <div className="info-message">
                <p>Password must be at least 6 characters</p>
              </div>

              {/* Signup Link */}
              <div className="auth-link">
                <span>Don't have an account? </span>
                <a onClick={handleNavigateToSignup} className="link">
                  Sign Up
                </a>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signin;
