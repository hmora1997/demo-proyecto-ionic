import { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import "./Firma.css";
import { IonButton, IonIcon } from "@ionic/react";
import { arrayFirmas, arrayFirmasSupervisor } from "../services/globalArrays";

const Firma = ({ title, position = {}, onClose, onSave, isSupervisor = false }) => {
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [error, setError] = useState("");

  const saveDrawing = () => {
    if (canvasRef.current.isEmpty()) {
      setError("La firma no puede estar vacía. Por favor, firme antes de guardar.");
      return;
    }

    const canvasImage = canvasRef.current.getTrimmedCanvas().toDataURL();
    if (isSupervisor) {
      arrayFirmasSupervisor[0] = canvasImage;
      console.log('Firma del supervisor guardada:', arrayFirmasSupervisor);
    } else {
      arrayFirmas[position] = canvasImage;
      console.log('Firma guardada:', arrayFirmas);
    }
    onSave(canvasImage);
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="canvas-options">
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                
              </div>
              <div className="col d-flex justify-content-end align-items-center">
                <IonButton
                  expand="block"
                  onClick={() => canvasRef.current.clear()}
                  className="custom-button mx-0 button-blue"
                >
                  BORRAR
                </IonButton>
              </div>
            </div>
          </div>
        </div>
        <SignatureCanvas
          penColor={brushColor}
          canvasProps={{ className: 'sigCanvas rounded-3 my-5', style: { pointerEvents: showColorPicker ? 'none' : 'auto' } }}
          ref={canvasRef}
        />
        {error && <div className="error-message-firma rounded-3 p-2">{error}</div>}
        <div className="container-fluid">
          <div className="row">
            <div className="col px-0">
              <IonButton
                expand="block"
                onClick={saveDrawing}
                className="custom-button mx-0 button-blue"
              >
                GUARDAR FIRMA
              </IonButton>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Firma;
