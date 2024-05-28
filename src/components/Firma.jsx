import { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { SwatchesPicker } from "react-color";
import "./Firma.css"; // Importa los estilos CSS para el modal
import { brushOutline } from "ionicons/icons";
import { IonButton, IonIcon } from "@ionic/react";
import { arrayFirmas, arrayFirmasSupervisor } from "../services/globalArrays";

const Firma = ({ title, position = {}, onClose, onSave, isSupervisor = false }) => {
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (colorValue) => {
    setBrushColor(colorValue.hex);
  };

  const saveDrawing = () => {
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
              <div className="col position-relative d-flex align-items-center">
                <button
                  className="brush-btn text-center p-2"
                  style={{ backgroundColor: brushColor }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  <IonIcon style={{ color: "white" }} icon={brushOutline} />
                </button>
                {showColorPicker && (
                  <div className="color-picker">
                    <SwatchesPicker onChange={handleColorChange} />
                  </div>
                )}
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
