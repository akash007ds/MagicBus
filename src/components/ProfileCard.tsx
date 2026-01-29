import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonAvatar,
  IonBadge,
  IonText,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import {
  personCircleOutline,
  locationOutline,
  pulseOutline,
  checkmarkCircleOutline,
  cashOutline,
} from 'ionicons/icons';
import '../styles/ProfileCard.css';

interface ProfileData {
  name: string;
  age: number;
  location: string;
  profilePic: string;
  status: string;
  attendance: number;
  familyIncome: string;
}

interface Props {
  userData: ProfileData;
}

const ProfileCard: React.FC<Props> = ({ userData }) => {
  return (
    <div className="profile-card-container">
      <IonCard className="profile-card">
        <IonCardHeader className="profile-header">
          <div className="avatar-container">
            <IonAvatar className="profile-avatar">
              <img src={userData.profilePic} alt={userData.name} />
            </IonAvatar>
            <IonBadge className={`status-badge status-${userData.status.toLowerCase()}`}>
              {userData.status}
            </IonBadge>
          </div>
          <IonCardTitle className="profile-name">{userData.name}</IonCardTitle>
          <IonText color="medium" className="profile-age">
            Age: {userData.age} years
          </IonText>
        </IonCardHeader>

        <IonCardContent className="profile-content">
          <div className="profile-detail-item">
            <div className="detail-icon">
              <IonIcon icon={locationOutline} />
            </div>
            <div className="detail-text">
              <div className="detail-label">Location</div>
              <div className="detail-value">{userData.location}</div>
            </div>
          </div>

          <div className="profile-detail-item">
            <div className="detail-icon">
              <IonIcon icon={pulseOutline} />
            </div>
            <div className="detail-text">
              <div className="detail-label">Status</div>
              <div className="detail-value">{userData.status}</div>
            </div>
          </div>

          <div className="profile-detail-item">
            <div className="detail-icon">
              <IonIcon icon={checkmarkCircleOutline} />
            </div>
            <div className="detail-text">
              <div className="detail-label">Attendance</div>
              <div className="detail-value">{userData.attendance}%</div>
            </div>
          </div>

          <div className="profile-detail-item">
            <div className="detail-icon">
              <IonIcon icon={cashOutline} />
            </div>
            <div className="detail-text">
              <div className="detail-label">Family Income</div>
              <div className="detail-value">{userData.familyIncome}</div>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default ProfileCard;
