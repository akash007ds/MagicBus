import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { checkmarkCircle, ellipse, alertCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import '../styles/JourneyTimeline.css';
import RiskAlertModal from './RiskAlertModal';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  hasRiskAlert?: {
    riskReason: string;
    probability: string;
  };
}

interface Props {
  journeyData: TimelineEvent[];
  beneficiaryName?: string;
}

const JourneyTimeline: React.FC<Props> = ({ journeyData, beneficiaryName = 'User' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<any>(null);

  const handleAlertClick = (event: TimelineEvent) => {
    if (event.hasRiskAlert) {
      setSelectedRisk({
        beneficiary: beneficiaryName,
        currentEnrollment: event.title,
        riskReason: event.hasRiskAlert.riskReason,
        probability: event.hasRiskAlert.probability,
      });
      setIsModalOpen(true);
    }
  };
  return (
    <>
      <div className="journey-timeline-container">
        <IonCard className="journey-card">
          <IonCardHeader className="journey-header">
            <IonCardTitle>Journey Timeline</IonCardTitle>
            <p className="journey-subtitle">Year-wise achievements and milestones</p>
          </IonCardHeader>

          <IonCardContent className="journey-content">
            <div className="timeline">
              {journeyData.map((event, index) => (
                <div key={index} className={`timeline-item timeline-${event.status}`}>
                  <div className="timeline-marker">
                    <div className="marker-circle">
                      {event.status === 'completed' ? (
                        <IonIcon icon={checkmarkCircle} className="marker-icon completed" />
                      ) : (
                        <IonIcon icon={ellipse} className="marker-icon" />
                      )}
                    </div>
                    {index < journeyData.length - 1 && <div className="timeline-line"></div>}
                  </div>

                  <div className="timeline-content">
                    <div className="timeline-header-wrapper">
                      <div>
                        <div className="timeline-year">{event.year}</div>
                        <div className="timeline-title">{event.title}</div>
                        <div className="timeline-description">{event.description}</div>
                      </div>
                      {event.hasRiskAlert && (
                        <IonButton
                          fill="clear"
                          className="alert-button"
                          onClick={() => handleAlertClick(event)}
                        >
                          <IonIcon icon={alertCircleOutline} className="alert-icon-button" />
                        </IonButton>
                      )}
                    </div>
                    {event.status === 'current' && (
                      <span className="status-label current">Current</span>
                    )}
                    {event.status === 'ongoing' && (
                      <span className="status-label ongoing">Ongoing</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </IonCardContent>
        </IonCard>
      </div>

      {selectedRisk && (
        <RiskAlertModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          beneficiary={selectedRisk.beneficiary}
          currentEnrollment={selectedRisk.currentEnrollment}
          riskReason={selectedRisk.riskReason}
          probability={selectedRisk.probability}
        />
      )}
    </>
  );
};

export default JourneyTimeline;
