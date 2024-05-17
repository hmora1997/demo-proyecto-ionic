import { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import CanvasDraw from "react-canvas-draw";
import { SwatchesPicker } from "react-color";
import "./Firma.css"; // Importa los estilos CSS para el modal
import {
  brushOutline,
  closeOutline,
  returnUpBackOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import arrayFirmas from "../services/globalArrays";

const Firma = ({ position = {}, onClose }) => {
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [savedDrawing, setSavedDrawing] = useState("");

  const handleColorChange = (colorValue) => {
    setBrushColor(colorValue.hex);
  };

  const saveDrawing = () => {
    const drawingData = canvasRef.current.getSaveData();
    setSavedDrawing(drawingData);
    const canvasImage =
      canvasRef.current.canvasContainer.children[1].toDataURL();
    arrayFirmas[position] = canvasImage;
    onClose();
  };

  return (
    <Modal show={true} onHide={() => {}}>
      <Modal.Header closeButton>
        <Modal.Title>Firma Trabajador</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="canvas-options">
          <div className="container">
            <div className="row">
              <div className="col-1">
                <button
                  className="brush-btn text-center p-2"
                  style={{ backgroundColor: brushColor }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  <IonIcon style={{ color: "white" }} icon={brushOutline} />
                </button>
                {showColorPicker && (
                  <SwatchesPicker onChange={handleColorChange} />
                )}
              </div>
              <div
                className="col"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "nowrap",
                }}
              >
                <label>Tamaño</label>
                <input
                  type="number"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                />
              </div>
              <div className="col">
                <Button
                  variant="primary"
                  onClick={() => canvasRef.current.undo()}
                >
                  <IonIcon icon={returnUpBackOutline} />
                </Button>
              </div>
              <div className="col">
                <Button
                  variant="primary"
                  onClick={() => canvasRef.current.clear()}
                >
                  <IonIcon icon={closeOutline} />
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Button variant="primary" onClick={saveDrawing}>
                  Guardar Firma
                </Button>
              </div>
            </div>
          </div>
        </div>
        <CanvasDraw
          brushRadius={brushSize}
          lazyRadius={0}
          brushColor={brushColor}
          ref={canvasRef}
        />
        {/* <div>{savedDrawing}</div> */}
      </Modal.Body>
    </Modal>
  );
};

export default Firma;
