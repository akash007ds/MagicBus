import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonButtons,
} from '@ionic/react';
import { logOutOutline, arrowBackOutline } from 'ionicons/icons';
import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/UserProfile.css';
import ProfileCard from '../components/ProfileCard';
import JourneyTimeline from '../components/JourneyTimeline';
import ThemeToggle from '../components/ThemeToggle';
import studentsDataFile from '../data/studentsData.json';

const UserProfile: React.FC = () => {
  const history = useHistory();
  const [journeyData, setJourneyData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const previousStudentIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      history.push('/signin');
    }
  }, [history]);

  useEffect(() => {
    // Load selected student data from localStorage
    // This will run whenever the component mounts or when we return from /students
    const selectedStudentId = localStorage.getItem('selectedStudentId');
    
    // Load student data if selectedStudentId exists and has changed
    if (selectedStudentId) {
      const studentId = parseInt(selectedStudentId, 10);
      const student = studentsDataFile.students.find(s => s.id === studentId);
      if (student) {
        setUserData(student);
        setJourneyData(student.journeyTimeline);
        previousStudentIdRef.current = selectedStudentId;
      }
    }
  }, []);

  // Add a listener for when the page regains focus (user navigates back)
  useEffect(() => {
    const handleFocus = () => {
      const selectedStudentId = localStorage.getItem('selectedStudentId');
      
      // If selectedStudentId changed, reload the student data
      if (selectedStudentId && selectedStudentId !== previousStudentIdRef.current) {
        const studentId = parseInt(selectedStudentId, 10);
        const student = studentsDataFile.students.find(s => s.id === studentId);
        if (student) {
          setUserData(student);
          setJourneyData(student.journeyTimeline);
          previousStudentIdRef.current = selectedStudentId;
        }
      }
    };

    const handleWindowFocus = () => {
      handleFocus();
    };

    // Listen to window focus event
    window.addEventListener('focus', handleWindowFocus);

    // Also check immediately when component mounts or when history changes
    const checkStudentId = () => {
      handleFocus();
    };

    // Run check when route changes
    const unlisten = history.listen(() => {
      setTimeout(checkStudentId, 0);
    });

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
      unlisten();
    };
  }, [history]);

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('selectedStudentId');

    // Clear browser history to prevent back button navigation
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };

    // Redirect to signin
    history.replace('/signin');
  };

  const handleBack = () => {
    history.push('/students');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBack}>
              <IonIcon slot="start" icon={arrowBackOutline} />
              Back
            </IonButton>
          </IonButtons>
          <IonTitle>User Profile</IonTitle>
          <IonButtons slot="end">
            <ThemeToggle />
            <IonButton onClick={handleLogout} color="danger">
              <IonIcon slot="start" icon={logOutOutline} />
              Logout
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="profile-container">
          {/* Left Panel - Profile Details */}
          <div className="profile-left-panel">
            {userData && <ProfileCard userData={userData} />}
          </div>

          {/* Right Panel - Journey Timeline */}
          <div className="profile-right-panel">
            <JourneyTimeline 
              journeyData={journeyData} 
              beneficiaryName={userData?.name || 'User'}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;