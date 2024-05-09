import {
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowUndoOutline, brushOutline, closeOutline } from "ionicons/icons";
import { useState, useRef } from "react";
import * as styles from "./Firma.css";

import CanvasDraw from "react-canvas-draw";
import { SwatchesPicker } from "react-color";

const Firma = ({ trabajadorId }) => {
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
    console.log(canvasImage);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Firma Trabajador</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.canvasOptions}>
          <IonGrid className={styles.fixed}>
            <IonRow>
              <IonCol size={showColorPicker ? "12" : "2"}>
                <IonButton
                  style={{ backgroundColor: brushColor }}
                  color={brushColor}
                  expand="block"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  <IonIcon icon={brushOutline} />
                </IonButton>

                {showColorPicker && (
                  <SwatchesPicker
                    onChange={handleColorChange}
                    className={styles.picker}
                  />
                )}
              </IonCol>

              {!showColorPicker && (
                <>
                  <IonCol size="4">
                    <IonItem lines="none">
                      <IonLabel position="inset">Tamaño</IonLabel>
                      <IonInput
                        type="number"
                        value={brushSize}
                        onIonChange={(e) =>
                          setBrushSize(parseInt(e.target.value))
                        }
                      />
                    </IonItem>
                  </IonCol>

                  <IonCol size="3">
                    <IonButton
                      expand="full"
                      color="primary"
                      onClick={() => canvasRef.current.undo()}
                    >
                      <IonIcon icon={arrowUndoOutline} />
                    </IonButton>
                  </IonCol>

                  <IonCol size="3">
                    <IonButton
                      expand="full"
                      color="primary"
                      onClick={() => canvasRef.current.clear()}
                    >
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonCol>
                </>
              )}
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton expand="block" onClick={saveDrawing}>
                  Guardar Firma
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        <CanvasDraw
          brushRadius={brushSize}
          lazyRadius={0}
          canvasHeight={window.innerHeight}
          canvasWidth={window.innerWidth}
          brushColor={brushColor}
          ref={canvasRef}
        />
        <div>{savedDrawing}</div>
      </IonContent>
    </IonPage>
  );
};

export default Firma;
