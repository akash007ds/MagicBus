import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonButtons,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Students.css';
import ThemeToggle from '../components/ThemeToggle';
import studentsDataFile from '../data/studentsData.json';

interface Student {
  id: number;
  name: string;
  profilePic: string;
  age: number;
  location: string;
  status: string;
  attendance: number;
  familyIncome: string;
}

const Students: React.FC = () => {
  const history = useHistory();
  const [students, setStudents] = useState<Student[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<string>('');

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('currentUsername');
    
    if (!isLoggedIn) {
      history.push('/signin');
    } else {
      setLoggedInUser(username || 'User');
    }
  }, [history]);

  useEffect(() => {
    // Load students data from JSON file
    setStudents(studentsDataFile.students);
  }, []);

  const handleStudentClick = (studentId: number) => {
    // Store selected student ID in localStorage
    localStorage.setItem('selectedStudentId', studentId.toString());
    // Navigate to profile page
    history.push('/profile');
  };

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="header-title">
            <div className="welcome-section">
              <span className="welcome-text">Welcome, {loggedInUser}!</span>
            </div>
          </IonTitle>
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
        <div className="students-container">
          <div className="students-header">
            <h2>Select a Student Profile</h2>
            <p className="students-count">Showing {students.length} students</p>
          </div>

          <div className="students-grid">
            {students.map((student) => (
              <IonCard
                key={student.id}
                className="student-card"
                onClick={() => handleStudentClick(student.id)}
              >
                <div className="student-card-image">
                  <img src={student.profilePic} alt={student.name} />
                  <div className="student-overlay">
                    <span className="view-profile-text">View Profile</span>
                  </div>
                </div>
                <IonCardContent className="student-card-content">
                  <div className="student-name">{student.name}</div>
                  <div className="student-location">{student.location}</div>
                  <div className="student-meta">
                    <span className="meta-item">Age: {student.age}</span>
                    <span className="meta-item">Attendance: {student.attendance}%</span>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Students;
