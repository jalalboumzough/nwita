import React from "react";
import "./Notecard.css";
import Epingle from "./Epingle";

const NoteCard = (props) => {
  return (
    <>
      <div className="note-card">
        <div className="note-title">
          Note Title
          <Epingle ispang={props.ispang} className="epingler" />
        </div>
        <div className="note-content">
          Nous souhaitons vous informer de quelques changements importants
          concernant les procédures de télétravail qui entreront en vigueur à
          partir du [Date de Mise en Application]. Ces ajustements visent à
          améliorer notre flexibilité tout en maintenant notre efficacité
          opérationnelle.
        </div>
      </div>
      <div className="note-card">
        <div className="note-title">
          <span>Note Title</span>
          <Epingle ispang={props.ispang} />
        </div>
        <div className="note-content">
          Nous souhaitons vous informer de quelques changements importants
          concernant les procédures de télétravail qui entreront en vigueur à
          partir du [Date de Mise en Application]. Ces ajustements visent à
          améliorer notre flexibilité tout en maintenant notre efficacité
          opérationnelle.
        </div>
      </div>
    </>
  );
};

export default NoteCard;
