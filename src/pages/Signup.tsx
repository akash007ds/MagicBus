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
import { mailOutline, lockClosedOutline, personOutline, callOutline } from 'ionicons/icons';
import '../styles/Signup.css';

const Signup: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

  const handleSignup = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Store user data in localStorage for dummy authentication
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }));

      setSubmitted(true);
      setTimeout(() => {
        history.push('/signin');
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleNavigateToSignin = () => {
    history.push('/signin');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="signup-content">
        <div className="signup-container">
          <IonCard className="signup-card">
            <IonCardContent className="signup-card-content">
              <div className="signup-header">
                <h1 className="signup-title">Create Account</h1>
                <p className="signup-subtitle">Join us today</p>
              </div>

              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <p>Account created successfully!</p>
                  <p>Redirecting to signin...</p>
                </div>
              ) : (
                <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
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
                    />
                    {errors.username && <span className="error-text">{errors.username}</span>}
                  </div>

                  {/* Email Field */}
                  <div className="form-group">
                    <label className="form-label">
                      <IonIcon icon={mailOutline} className="field-icon" />
                      Email
                    </label>
                    <IonInput
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="Enter email"
                      value={formData.email}
                      onIonChange={(e) => handleInputChange('email', e.detail.value)}
                      type="email"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  {/* Phone Field */}
                  <div className="form-group">
                    <label className="form-label">
                      <IonIcon icon={callOutline} className="field-icon" />
                      Phone Number
                    </label>
                    <IonInput
                      className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onIonChange={(e) => handleInputChange('phone', e.detail.value)}
                      type="tel"
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
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
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="form-group">
                    <label className="form-label">
                      <IonIcon icon={lockClosedOutline} className="field-icon" />
                      Confirm Password
                    </label>
                    <IonInput
                      className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onIonChange={(e) => handleInputChange('confirmPassword', e.detail.value)}
                      type="password"
                    />
                    {errors.confirmPassword && (
                      <span className="error-text">{errors.confirmPassword}</span>
                    )}
                  </div>

                  {/* Signup Button */}
                  <IonButton
                    expand="block"
                    className="signup-button"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </IonButton>
                </form>
              )}

              {/* Login Link */}
              <div className="auth-link">
                <span>Already have an account? </span>
                <a onClick={handleNavigateToSignin} className="link">
                  Sign In
                </a>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
