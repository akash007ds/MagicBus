import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { closeOutline, sparklesOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import '../styles/AIRecommendationsModal.css';
import aiRecommendationsData from '../data/aiRecommendations.json';

interface AIRecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIRecommendationsModal: React.FC<AIRecommendationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    // Load recommendations based on selected student ID
    const selectedStudentId = localStorage.getItem('selectedStudentId');
    if (selectedStudentId) {
      const studentId = parseInt(selectedStudentId, 10);
      const userRec = aiRecommendationsData.userRecommendations.find(
        (rec) => rec.userId === studentId
      );
      if (userRec) {
        setRecommendations(userRec.recommendations);
      }
    }
  }, [isOpen]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonIcon icon={sparklesOutline} /> AI Recommendations
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="recommendations-container">
          <table className="recommendations-table">
            <thead>
              <tr>
                <th>Recommended Track</th>
                <th>Match Score</th>
                <th>Retention Rate</th>
                <th>Avg Salary</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec) => (
                <tr key={rec.id} className="recommendation-row">
                  <td className="track-cell">{rec.recommendedTrack}</td>
                  <td className="score-cell">
                    <span className="score-badge">{rec.matchScore}</span>
                  </td>
                  <td className="retention-cell">
                    <span className="retention-badge">{rec.retentionRate}</span>
                  </td>
                  <td className="salary-cell">{rec.averageSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default AIRecommendationsModal;
