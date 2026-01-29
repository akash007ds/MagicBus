import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from '@ionic/react';
import { closeOutline, alertCircleOutline, sparklesOutline } from 'ionicons/icons';
import { useState } from 'react';
import '../styles/RiskAlertModal.css';
import AIRecommendationsModal from './AIRecommendationsModal';

interface RiskAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiary: string;
  currentEnrollment: string;
  riskReason: string;
  probability: string;
}

const RiskAlertModal: React.FC<RiskAlertModalProps> = ({
  isOpen,
  onClose,
  beneficiary,
  currentEnrollment,
  riskReason,
  probability,
}) => {
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  const handleViewRecommendations = () => {
    onClose();
    setShowAIRecommendations(true);
  };

  const handleCloseRecommendations = () => {
    setShowAIRecommendations(false);
  };

  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={onClose}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Risk Alert Details</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className="risk-alert-container">
            {/* Beneficiary and Current Enrollment - Inline Text */}
            <div className="inline-info-section">
              <div className="inline-info-item">
                <span className="inline-label">Beneficiary:</span>
                <span className="inline-value">{beneficiary}</span>
              </div>
              <div className="inline-info-item">
                <span className="inline-label">Current Enrollment:</span>
                <span className="inline-value">{currentEnrollment}</span>
              </div>
            </div>

            {/* Risk Alert Card */}
            <IonCard className="alert-danger-card">
              <IonCardHeader>
                <div className="alert-header">
                  <IonIcon icon={alertCircleOutline} className="alert-icon" />
                  <IonCardTitle>Risk Alert</IonCardTitle>
                </div>
              </IonCardHeader>
              <IonCardContent>
                <div className="risk-item">
                  <span className="risk-label">Reason:</span>
                  <IonText className="risk-value">{riskReason}</IonText>
                </div>
                <div className="risk-item">
                  <span className="risk-label">Probability:</span>
                  <span className="probability-badge">{probability}</span>
                </div>
              </IonCardContent>
            </IonCard>

            {/* View AI Recommendations Button */}
            <div className="ai-recommendations-button-container">
              <IonButton
                expand="block"
                className="ai-recommendations-button"
                onClick={handleViewRecommendations}
              >
                <IonIcon slot="start" icon={sparklesOutline} />
                View AI Recommendations
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>

      <AIRecommendationsModal
        isOpen={showAIRecommendations}
        onClose={handleCloseRecommendations}
      />
    </>
  );
};

export default RiskAlertModal;
