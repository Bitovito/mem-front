import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AppHelp() {
  const [expanded, setExpanded] = React.useState(false);

  const createHandleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const createHandleOnEntered = (panel) => () => {
    const summaryNode = document.getElementById(`${panel}bh-header`);
    if (summaryNode) {
      summaryNode.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={createHandleChange("panel1")}
        slotProps={{
          transition: {
            onEntered: createHandleOnEntered("panel1"),
          },
        }}
        sx={{
          boxShadow: "none",
          backgroundColor: "#00838f",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>
            Esta aplicación es un asistente virtual para astronomos e interesados en la 
            astronomía. Su objetivo principal es facilitar el acceso a información disponible 
            en el Observatorio Virtual. También se puede interactuar con el asistente para 
            responder preguntas varias relacionadas con la astronomía. Es recomendable 
            interactuar y hacer preguntas al asistente para comprender mejor su funcionamiento 
            y como solicitar información.
            </Typography>
            <Typography>
            Para ver funcionalidades de la aplicación, asi como ejemplos de uso, extienda el parrafo.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ marginBottom: 2 }}>
            El asistente tiene capacidad para buscar información y datos en los repositorios del 
            Observatorio virtual, además de responder preguntas de conocimiento especifico haciendo 
            uso de su capacidad de recuperación de documentos.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Puede buscar tablas de información independiente de la naturaleza de la misma o 
            especificando. Por ejemplo, si se quiere infomación de la estrella Eta Carinae, una 
            pregunta podría ser la siguiente:
          </Typography>
          <Typography sx={{ marginBottom: 2, fontWeight: "bold" }}>
            "Give me information related to 'Eta Carina'"
          </Typography>
          <Typography sx={{ marginBottom: 2, fontWeight: "bold" }}>
            Notar que la solicitud se hizo en inglés. Debido a la amplia utilización del inglés, 
            la mayoría de los recursos del Observatorio Virtual usan su nombre en inglés. Para 
            evitar molestias, prefiera hacer sus consultas en inglés o al menos utilizar los 
            nombres anglosajones de los objetos astronómicos.
          </Typography>
          <Typography sx={{ marginBottom: 2, fontWeight: "bold" }}>
            Para obtener datos especificamente gráficos (jpg, png o FITS), la consulta podría ser:
          </Typography>
          <Typography sx={{ marginBottom: 2, fontWeight: "bold" }}>
            "Give me images related to Sagitarius A*"
          </Typography>
          <Typography sx={{ marginBottom: 2, fontWeight: "bold" }}>
            "Give me all graphical data related to Eta Carina"
          </Typography>
          <Typography sx={{ marginBottom: 2, fontWeight: "bold" }}>
            "Give me all graphical data related to Eta Carina"
          </Typography>

        </AccordionDetails>
      </Accordion>
    </div>
  );
}
